import { Injectable } from '@angular/core';

@Injectable()
export class CliService {

  constructor() { }

  serialize(values) {
    return Object.keys(values)
      .filter( key => key !== 'app-name' || values[key] === '')
      .map( key => `--${key}=${values[key]}`)
      .join(' ');
  }

}
