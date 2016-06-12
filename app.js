'use strict'
const exec = require('child_process').exec
    , fs = require('fs')
    , fetchCatImageCmd = "curl -k 'https://www.googleapis.com/customsearch/v1?key=" + process.env.GOOGLE_CUSTOMSEARCH_APIKEY + "&cx=" + process.env.CSE_ID + "&searchType=image&q=neko'"
    ;

exec(fetchCatImageCmd,
  (err, stdout, stderr) => {
    if (err) {
      writeLog(__dirname + 'err.log', err);
      return;
    }

    writeLog('stdout.log', stdout);
    writeLog('stderr.log', stderr);

    const catImageInfo = JSON.parse(stdout);
    console.log(catImageInfo);
  }
);

function writeLog(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
