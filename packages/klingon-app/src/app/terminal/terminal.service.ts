import { CliService } from './../cli/cli.service';
import { Injectable } from '@angular/core';

export interface Terminal {
  _initialized: boolean;
  textarea: HTMLTextAreaElement;
  colors: string[];
  theme: string;
  convertEol: boolean;
  termName: string;
  geometry: number[];
  cursorBlink: boolean;
  cursorStyle: string;
  visualBell: boolean;
  popOnBell: boolean;
  scrollback: number;
  screenKeys: boolean;
  debug: boolean;
  cancelEvents: boolean;
  disableStdin: boolean;
  useFlowControl: boolean;
  tabStopWidth: number;
  on(event: string, callbakck: Function);
  open(container: HTMLElement, focus: boolean);
  fit();
  proposeGeometry();
  attach(socket: WebSocket);
  writeln(message: string);
  write(message: string);
  send(data: string);
  clear();
};

interface CommandResult {
  stderr: string;
  stdout: string;
}

@Injectable()
export class TerminalService {

  term: Terminal;
  pid: number;
  socketURL: string;
  socket: WebSocket;

  constructor(
    public cli: CliService
  ) {
    this.cli.runCommand('ng -v')
      .subscribe( (data: CommandResult) => console.log(data.stdout || data.stderr))
  }

  async createTerminal(terminalContainer: HTMLElement) {

    return new Promise( async(resolve, reject) => {

    this.term = new (window as any).Terminal({
      cursorBlink: true,
      debug: true
    });
    this.term.on('resize', (size) => {
      if (!this.pid) {
        return;
      }
      const cols = size.cols;
      const rows = size.rows;
      const url = `http://localhost:3000/terminals/${this.pid}/size?cols=${cols}&rows=${rows}`;

      fetch(url, { method: 'POST' });
    });

    this.socketURL = `ws://localhost:3000/terminals`;

    this.term.open(terminalContainer, false);
    this.term.fit();

    const initialGeometry = this.term.proposeGeometry();
    const cols = 180;
    const rows = 50;

    const res = await fetch(`http://localhost:3000/terminals?cols=${cols}&rows=${rows}`, {
      method: 'POST'
    });

    const pid = await res.text();
    this.socket = new WebSocket(`${this.socketURL}/${pid}`);
    this.socket.onopen = () => {
      // this.term.attach(this.socket);
      Attacher.attach(this.term, this.socket, true, 10);
      this.term._initialized = true;
      setTimeout(_ => resolve(), 100);
    };
    // this.socket.onmessage = function(event) {
      
    //   let json = null;
    //   try {
    //     json = JSON.parse(event.data);
    //   }
    //   catch(e) {}

    //   if (json) {
    //     console.log(event, json);
    //     const message = new MessageEvent('message', {
    //       data : json.stdout
    //     });
    //     this.dispatchEvent(message);
    //   }

    // };
    this.socket.onclose = this.socketError;
    this.socket.onerror = this.socketError;
    });
  }

  socketError() {
  }

  on(event, callback) {
    this.term.on(event, callback);
  }

  send(data) {
    this.term.clear();
    this.term.send(`${data}\n`);
  }

  write(data) {
    this.term.write(data);
  }

  stop() {
    this.term.send('\x03');
  }

}


class Attacher {
  constructor() {}

  static attach(term, socket, bidirectional, buffered) {
    bidirectional = (typeof bidirectional == 'undefined') ? true : bidirectional;
    term.socket = socket;

    term._flushBuffer = function () {
      term.write(term._attachSocketBuffer);
      term._attachSocketBuffer = null;
      clearTimeout(term._attachSocketBufferTimer);
      term._attachSocketBufferTimer = null;
    };

    term._pushToBuffer = function (data) {
      if (term._attachSocketBuffer) {
        term._attachSocketBuffer += data;
      } else {
        term._attachSocketBuffer = data;
        setTimeout(term._flushBuffer, 10);
      }
    };

    term._getMessage = function (ev) {
      var data = "";
      try { 
        data = JSON.parse(ev.data);
        data = (data as any).stdout;
      } catch(e){};
      if (buffered) {
        term._pushToBuffer(data);
      } else {
        term.write(data);
      }
      console.log('socket::received');
      console.log(data);
    };

    term._sendData = function (data) {
      socket.send(data);
      console.log('socket::sent');
      console.log(data);
    };

    socket.addEventListener('message', term._getMessage);

    if (bidirectional) {
      term.on('data', term._sendData);
    }

    socket.addEventListener('close', Attacher.detach.bind(term, socket));
    socket.addEventListener('error', Attacher.detach.bind(term, socket));
  };

  static detach (term, socket) {
    debugger;
    term.off('data', term._sendData);

    socket = (typeof socket == 'undefined') ? term.socket : socket;

    if (socket) {
      socket.removeEventListener('message', term._getMessage);
    }

    delete term.socket;
  }
}