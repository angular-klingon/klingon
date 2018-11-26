import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CommandResult {
  stderr: string;
  stdout: string;
}

@Injectable()
export class CliService {
  response$: Subject<CommandResult>;
  ws: WebSocket;
  isConnectionOn;

  @Output() onNgCreate: EventEmitter<Subject<CommandResult>> = new EventEmitter<Subject<CommandResult>>();

  constructor() {
    this.response$ = new Subject();
    this.ws = new WebSocket(`ws://` + environment.host + `:` + environment.port + `/cli`);
    this.ws.onopen = e => {
      this.isConnectionOn = true;
    };
    this.ws.onclose = e => {
      this.isConnectionOn = false;
    };
    this.ws.onerror = e => {
      this.isConnectionOn = false;
    };
    this.ws.onmessage = e => {
      this.response$.next(JSON.parse(e.data));
    };
  }

  serialize(values) {
    return Object.keys(values)
      .filter(
        key =>
          values[key] !== null &&
          values[key] !== '' &&
          key !== 'app-name' &&
          key !== 'root-dir' &&
          key !== 'dir'
      )
      .map(key => `--${key}=${values[key]}`)
      .join(' ');
  }

  cliVersion() {
    return this.runNgCommand('-v');
  }

  cliHelp() {
    return this.runNgCommand('help');
  }

  runNgCommand(stdin, dir = undefined) {
    if (this.isConnectionOn) {
      this._send(stdin, dir);
      this.detectEvents(stdin, this.response$);
    }
    return this.response$;
  }

  /**
   * Detect ng operations such as new, serve, build, generate etc.
   * @param stdin string
   */
  private detectEvents(stdin: string, response: Subject<CommandResult>) {
    if (!stdin) {
      return;
    }

    const commandArray = stdin.split(' ');

    if (commandArray.length > 1) {
      if (commandArray[0] === 'new') {
        this.onNgCreate.emit(response);
      }
    }
  }

  _send(stdin, dir) {
    console.log(stdin);

    this.ws.send(
      JSON.stringify({
        stdin: stdin,
        dir: dir
      })
    );
  }
}
