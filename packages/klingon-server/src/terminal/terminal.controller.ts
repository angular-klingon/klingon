import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse
} from '@nestjs/websockets';

import * as pty from 'node-pty';
import * as os from 'os';

@Controller()
export class TerminalController {
  terminals = {};
  logs = {};
  websocket = {};

  @Get('/')
  getHello() {
    return 'Hello World! 1111';
  }

  @Post('/terminals')
  getTerminals(@Req() req: Request, @Res() res: Response) {
    const cols = parseInt(req.query.cols);
    const rows = parseInt(req.query.rows);
    const term = pty.spawn(
      process.platform === 'win32' ? 'cmd.exe' : 'bash',
      [],
      {
        name: 'xterm-color',
        cols: cols || 80,
        rows: rows || 24,
        cwd: os.homedir(),
        env: process.env
      }
    );

    console.log(`Created terminal with PID: ${term.pid}`);
    this.terminals[term.pid] = term;
    this.logs[term.pid] = '';
    term.on('data', data => {
      this.logs[term.pid] += data;
    });
    res.send({
      pid: term.pid.toString(),
      cwd: os.homedir(),
      platform: process.platform
    });
    res.end();
  }

  @WebSocketGateway({
    path: '/cli', origins: 'localhost:3000'
  })
  @SubscribeMessage('events')
  onEvent(client, data: any): WsResponse<any> {
    const event = 'events';
    console.log({event});
    return {
      event,
      data
    };
  }
}
