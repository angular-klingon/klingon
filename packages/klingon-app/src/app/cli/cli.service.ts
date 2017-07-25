import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CliService {

  constructor(
    public http: HttpClient
  ) { }

  serialize(values) {
    return Object.keys(values)
      .filter( key => values[key] !== null && values[key] !== '' && key !== 'app-name')
      .map( key => `--${key}=${values[key]}`)
      .join(' ');
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
