function getFolderIds(access_token) {
/*
curl
  --request GET
  --header "Authorization: Bearer <access_token>"
  "https://api.mendeley.com/folders?group_id=<group_id>"
*/
  var url = "https://api.mendeley.com/folders?group_id=" + LAZY_SUM_GROUP_ID;
  return fetchWithAccessToken(url, access_token);
}

function getDocumentsByFolder(folder_id, access_token) {
/*
curl
  --request GET
  --header "Authorization: Bearer <access_token>"
  "https://api.mendeley.com/folders/<folder_id>/documents?limit=50"
*/
  var url = "https://api.mendeley.com/folders/" + folder_id + "/documents?limit=50";
  return fetchWithAccessToken(url, access_token);
}

function getDocument(document_id, access_token) {
/*
curl
  --request GET
  --header "Authorization: Bearer <access_token>"
  "https://api.mendeley.com/documents/<document_id>"
*/
  var url = "https://api.mendeley.com/documents/" + document_id;
  return fetchWithAccessToken(url, access_token);
}

function fetchWithAccessToken(url, access_token) {
  var opt = {
    "method" : "GET",
    "headers" : {
      "Authorization": "Bearer " + access_token,
      "contentType": "application/x-www-form-urlencoded",
    }
  };
  var now = new Date();
  var text = "The time is: " + now.toString();
  GmailApp.sendEmail("snoopies.drum@gmail.com", "Lazy Sum Log", text);
  GmailApp.sendEmail("snoopies.drum@gmail.com", "Lazy Sum Log", url);
  var resData = UrlFetchApp.fetch(url, opt).getContentText();
  GmailApp.sendEmail("snoopies.drum@gmail.com", "Lazy Sum Log", resData);
  var parsedData = JSON.parse(resData);
  return parsedData;
  //return JSON.parse(UrlFetchApp.fetch(url, opt).getContentText());
}


function refreshToken() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var url = "https://api.mendeley.com/oauth/token";
  var opt = {
    "method" : "POST",
    "headers" : {
      "Authorization": "Basic " + Utilities.base64Encode(MENDELEY_APP_ID + ":" + MENDELEY_APP_SECRET),
      "contentType": "application/x-www-form-urlencoded",
    },
    "payload" : {
      "grant_type": "refresh_token",
      "refresh_token": scriptProperties.getProperty('refresh_token'),
      "redirect_uri": MENDELEY_APP_REDIRECT_URL_ENCODED
    },
  };

  var data = JSON.parse(UrlFetchApp.fetch(url, opt).getContentText());

  var access_token = data["access_token"];
  var refresh_token = data["refresh_token"];
  Logger.log('data["access_token"] : ' + access_token);
  Logger.log('data["access_token"] : ' + refresh_token);

  scriptProperties.setProperty('refresh_token', refresh_token);

  return access_token;
}
