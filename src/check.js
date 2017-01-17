function check() {

  var nT = compareMendeleyToSpreadsheet(T_FOLDER_ID, "T");
  var nS = compareMendeleyToSpreadsheet(S_FOLDER_ID, "S");
  
  var text = "投稿数 T = " + nT + ", S = " + nS;
  
  postToSlack(PIGGY, "#bank", text);

}

function compareMendeleyToSpreadsheet(mendeleyFolderId, sheetName) {
  var sheet = getSheet(MENDELEY_DATA_SHEET_ID, sheetName);
  var docs = getDocsFromSheet(sheet);
  var currentLength = docs.length;
  
  var at = refreshToken();
  var mendeleyIds = underscoreGS._pluck(getDocumentsByFolder(mendeleyFolderId, at), "id");

  for (var i = 0; i < mendeleyIds.length; i++) {
    var id = mendeleyIds[i];
    var sheetIds = underscoreGS._pluck(docs, "id");
    
    if (!underscoreGS._contains(sheetIds, id)) {
      /*
        when update mendeley cloud data comparing to spread sheet in google drive
       */
      var doc = getDocument(id, at);
      // spreadsheet index starts at 1, and first row cells contain attribute names.
      insertDoc(sheet, currentLength + 2, doc);
      currentLength++;
    }
  }
  return currentLength;
}

function debug() {
  var at = refreshToken();
  var docs = getDocumentsByFolder(T_FOLDER_ID, at);
  Logger.log(docs.length);
  Logger.log(docs);
}
