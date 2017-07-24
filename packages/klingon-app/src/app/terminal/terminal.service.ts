import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Terminal {
  _initialized: boolean;
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
  send(data: string);
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

  constructor(public http: HttpClient) {
    this.runCommand('ng -v')
      .subscribe( (data: CommandResult) => console.log(data.stdout || data.stderr))
  }

  async createTerminal(terminalContainer: HTMLElement) {
    this.term = new (window as any).Terminal();
    this.term.on('resize', function(size) {
      if (!this.pid) {
        return;
      }
      const cols = size.cols;
      const rows = size.rows;
      const url = `http://localhost:3000/terminals/${this.pid}/size?cols=${cols}&rows=${rows}`;

      fetch(url, { method: 'POST' });
    });

    this.socketURL = `ws://localhost:3000/terminals/`;

    this.term.open(terminalContainer, false);
    this.term.fit();

    var initialGeometry = this.term.proposeGeometry(),
      cols = initialGeometry.cols,
      rows = 50;

    const res = await fetch(`http://localhost:3000/terminals?cols=${cols}&rows=${rows}`, {
      method: 'POST'
    });

    const pid = await res.text();
    this.socket = new WebSocket(`${this.socketURL}/${pid}`);
    this.socket.onopen = () => {
      this.term.attach(this.socket);
      this.term._initialized = true;
      this.term.writeln('>> Welcome to Klingon v0.1.0 <<');
      
    };
    this.socket.onclose = this.socketError;
    this.socket.onerror = this.socketError;
  }

  socketError() {
  }

  cliVersion() {
    return this.runCommand('ng -v');
  }

  cliHelp() {
    return this.runCommand('ng help');
  }

  runCommand(command) {
    return this.http.post(`http://localhost:3000/cli/run`, {command});
  }
}
