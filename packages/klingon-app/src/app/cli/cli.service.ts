import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";


export interface CommandResult {
  stderr: string;
  stdout: string;
}

@Injectable()
export class CliService {

  response$: Subject<CommandResult>;
  ws: WebSocket;
  isConnectionOn;

  constructor() {
    this.response$ = new Subject();
    this.ws = new WebSocket(`ws://localhost:3000/cli`);
    this.ws.onopen = (e) => {
      this.isConnectionOn = true;
    };
    this.ws.onclose = (e) => {
      this.isConnectionOn = false;
    };
    this.ws.onerror = (e) => {
      this.isConnectionOn = false;
    };
    this.ws.onmessage = (e) => {
      this.response$.next(JSON.parse(e.data));
    };
  }

  serialize(values) {
    return Object.keys(values)
      .filter( key => values[key] !== null && values[key] !== '' && key !== 'app-name')
      .map( key => `--${key}=${values[key]}`)
      .join(' ');
  }

  cliVersion() {
    return this.runNgCommand('-v');
  }

  cliHelp() {
    return this.runNgCommand('help');
  }

  runNgCommand(stdin) {
    if (this.isConnectionOn) {
      this._send(stdin);
    }
    return this.response$;
  }

  _send(stdin) {
    console.log(stdin);
    
    this.ws.send(JSON.stringify({
      stdin
    }));
  }

}
