const express = require('express');
const { exec } = require("child_process");;
const codes = require('./codes');

const tvIP = process.env.TV_IP;
const tvPort = process.env.TV_PORT;

if (!tvIP || !tvPort) {
  throw new Error(`Missing TV_IP and TV_PORT env variable.`);
}
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const action = req.query.action;

  if (!action) {
    res.send('Missing action');
    return;
  }

  const code =  codes[action.toUpperCase()];
  if (!code) {
    res.send('Unknown code');
    return;
  }

  exec(`echo ${code} | telnet ${tvIP} ${tvPort}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });

  res.send(`Executed ${action}`);
});

app.listen(port, () => {
  console.log(`Lstening on port ${port}`)
});

