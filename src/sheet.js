function getSheet( id, sheetName ) {
  var sheets = SpreadsheetApp.openById(id).getSheets();
  for ( var i in sheets ){
    if ( sheets[i].getSheetName() == sheetName ) {
      return sheets[i];
    }
  }
  return null;
}

function getSheetTable(sheet) {
  var startrow = 1;
  var startcol = 1;
  var lastrow = sheet.getLastRow();
  var lastcol = sheet.getLastColumn();
  return sheetdata = sheet.getSheetValues(startrow, startcol, lastrow, lastcol);
}

/*
  2015/05/31
  the sheet contains only three cells:
    [0] : id
    [1] : created
    [2] : title
*/
var DOC_ATTRIBUTES = [
  "id",
  "created",
  "title"
];

function getDocsFromSheet(sheet) {
  var data = getSheetTable(sheet);
  var docs = [];
  // data[0] should be ["id","created","title"]
  for (var i = 1; i < data.length; i++) {
    docs.push({
      id: data[i][0],
      created: data[i][1],
      title: data[i][2]
    });
  }
  return docs;
}

function insertDoc(sheet, row, doc) {
  for (var i = 0; i < DOC_ATTRIBUTES.length; i++) {
    // sheet index starts at 1
    sheet.getRange(row, i+1).setValue(doc[DOC_ATTRIBUTES[i]]);
  }
}