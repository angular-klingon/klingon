const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const os = require('os');
const cors = require('cors');
const pty = require('node-pty');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const guard = require('./core/guard');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

const terminals = {};
const logs = {};
const websocket = {};

app.post('/terminals', (req, res) => {
    const cols = parseInt(req.query.cols);
    const rows = parseInt(req.query.rows);
    const term = pty.spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
        name: 'xterm-color',
        cols: cols || 80,
        rows: rows || 24,
        cwd: os.homedir(),
        env: process.env
    });

    console.log(`Created terminal with PID: ${term.pid}`);
    terminals[term.pid] = term;
    logs[term.pid] = '';
    term.on('data', (data) => {
        logs[term.pid] += data;
    });
    res.send({pid: term.pid.toString(), cwd: os.homedir(),platform: process.platform});
    res.end();
});

app.post('/terminals/:pid/size', (req, res) => {
    const pid = parseInt(req.params.pid);
    const cols = parseInt(req.query.cols);
    const rows = parseInt(req.query.rows);
    const term = terminals[pid];

    term.resize(cols, rows);
    console.log(`Resized terminal ${pid} to ${cols} cols and ${rows} rows.`);
    res.end();
});

app.ws('/cli', (ws, res) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);

        const flags = msg.stdin.split(' ');
        console.log('<<<', flags);

        if(msg.dir && !fs.existsSync(msg.dir)) {
            fs.mkdirSync(msg.dir,{recursive: true});            
        }

        const child = spawn(os.platform() === 'win32' ? 'ng.cmd' : 'ng', flags, {
            cwd: msg.dir || os.homedir(),
            env: process.env
        });

        child.stdin.setEncoding('utf-8');
        child.stdout.setEncoding('utf-8');
        child.stderr.setEncoding('utf-8');

        child.stdout.on('data', (stdout) => {
            console.log('We received a reply: ' + stdout);
            ws.send(JSON.stringify({
                stdout
            }));
        });
        child.stderr.on('data', (stderr) => {
            console.log('There was an error: ' + stderr);
            ws.send(JSON.stringify({
                stderr
            }));
        });
        child.on('exit', (exit) => {
            console.log("Child exited with code: " + exit);
            ws.send(JSON.stringify({
                exit: exit,
                platform: os.platform()
            }));
        });

        if (msg.KILL) {
            child.kill('SIGINT');
            ws.send(JSON.stringify({
                killed: true
            }));
        }
    });
    ws.on('close', () => {
        console.log(`Clean things up WS`);
    });
});

app.ws('/terminals/:pid', (ws, req) => {
    const term = terminals[parseInt(req.params.pid)];
    console.log(`Connected to terminal: ${term.pid}`);
    ws.send(logs[term.pid]);

    let command = '';
    term.on('data', (data) => {
        // This even will get emitted just after message event
        try {
            console.log('>>>', data);
            ws.send(data);
        } catch (ex) {
            // The WebSocket is not open, ignore
        }
    });
    ws.on('message', (msg) => {
        console.log('<<<', msg);
        
        // Check if input is "Enter" key
        if (msg.charCodeAt(0) !== 13) {
            /**
             * When we type command from shell, 'message' event fires for every character. So we append each character until "Enter" (13 ascii code) is
             * pressed. Once enter is pressed, it consider that the command is complete and validates 
             * it and reset the command value accordingly or kill it if  
             */
            command += msg;
        } else if (!guard.isValidShellCommand(command)) {

            // Pass ^C command if command is invalid. 
        
            term.kill('SIGINT');
            command = '';
            return;
        } else {
            command = '';
        }

        term.write(msg);
    });
    ws.on('close', () => {
        term.kill();
        console.log(`Closed terminal: ${term.pid}`);
        // Clean things up
        delete terminals[term.pid];
        delete logs[term.pid];
    });
});

const port = process.env.PORT || 3000;
const host = os.platform() === 'win32' ? '127.0.0.1' : '0.0.0.0';

console.log(`App listening to http://${host}:${port}`);
app.listen(port, host);