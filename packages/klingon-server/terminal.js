const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const os = require('os');
const cors = require('cors');
const pty = require('node-pty');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

const terminals = {};
const logs = {};

app.post('/terminals', (req, res) => {
    const cols = parseInt(req.query.cols);
    const rows = parseInt(req.query.rows);
    const term = pty.spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
        name: 'xterm-color',
        cols: cols || 80,
        rows: rows || 24,
        cwd: '/Users/wassimchegham/Sandbox/oss/klingon-workspace', //process.env.PWD
        env: process.env
    });

    console.log(`Created terminal with PID: ${term.pid}`);
    terminals[term.pid] = term;
    logs[term.pid] = '';
    term.on('data', (data) => {
        logs[term.pid] += data;
    });
    res.send(term.pid.toString());
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

app.post('/cli/run', (req, res) => {
    const exec = require('child_process').exec;
    exec(`${req.body.command}`, (e, stdout, stderr) => {
        if (e instanceof Error) {
            console.error(e);
            res.status(500).send({
                stdout,
                stderr
            });
            throw e;
        }
        res.status(200).send({
            stdout,
            stderr
        });
    });
});


app.ws('/terminals/:pid', (ws, req) => {
    const term = terminals[parseInt(req.params.pid)];
    console.log(`Connected to terminal: ${term.pid}`);
    ws.send(logs[term.pid]);

    term.on('data', (data) => {
        try {
            ws.send(data);
        } catch (ex) {
            // The WebSocket is not open, ignore
        }
    });
    ws.on('message', (msg) => {
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