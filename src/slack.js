function postToSlack( sender, channel, text) {
   
   var payloadJson = JSON.stringify(makeParams(sender, channel, text));
  
   var options = {
     'method': 'post',
     'contentType': 'json',
     'payload': payloadJson
   };

   UrlFetchApp.fetch(SLACK_INCOMING_URL, options);
}

function makeParams(sender, channel, text) {
  return {
    'icon_emoji': sender.icon,
    'username': sender.name,
    'channel': channel,
    'text': text
  };
}
