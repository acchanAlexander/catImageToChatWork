'use strict'
const exec = require('child_process').exec
    , fs = require('fs')
    , fetchCatImageCmd = "curl -k 'https://www.googleapis.com/customsearch/v1?key=" + process.env.GOOGLE_CUSTOMSEARCH_APIKEY + "&cx=" + process.env.CSE_ID + "&searchType=image&q=ねこ'"
    ;

exec(fetchCatImageCmd,
  (err, stdout, stderr) => {
    if (err) {
      writeLog(__dirname + 'err.log', err);
      return;
    }

    writeLog('stdout.log', stdout);
    writeLog('stderr.log', stderr);

    const searchResult = JSON.parse(stdout)
        , catImagesInfo = searchResult.items
        , rand = Math.floor(Math.random() * 10)
        , catImageLink = catImagesInfo[rand].link
        ;

    postChatWork(catImageLink);
  }
);

function postChatWork(imageLink) {
  const msg = 'にゃんこ画像でも見て一息つきましょう(=^･ω･^=)\n' + imageLink
      , cmdPostChatWork = 'curl -X POST -H "X-ChatWorkToken: ' + process.env.CHATWORK_TOKEN + '" -d "body=' + msg + '" "https://api.chatwork.com/v1/rooms/' + process.env.CHATWORK_CAT_ROOM_ID + '/messages"'
      ;

  exec(cmdPostChatWork,
    function (err, stdout, stderr) {
      if (err){
        writeLog('err.log', err);
        return;
      }

      writeLog('stdout.log', stdout);
      writeLog('stderr.log', stderr);
    }
  );
};

function writeLog(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
