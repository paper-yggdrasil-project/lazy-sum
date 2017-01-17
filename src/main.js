function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Lazy Sum')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .getContent();
}

function getTokenURL() {
  var url = 'https://api.mendeley.com/oauth/authorize?client_id=' + MENDELEY_APP_ID;
    url += '&redirect_uri=' + encodeURIComponent(MENDELEY_APP_REDIRECT_URL);
    url += '&response_type=code';
    url += '&scope=' + "all";
    //url += '&state=' + ScriptApp.newStateToken().withMethod('callback').withArgument('name', 'value').withTimeout(2000).createToken();
  return url;
}

function getDocs(sheetName) {
  return getDocsFromSheet(getSheet(MENDELEY_DATA_SHEET_ID, sheetName));
}

function hoge() {
  var docs = getDocs("T");
  Logger.log(docs);
}
