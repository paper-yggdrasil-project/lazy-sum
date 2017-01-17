# Lazy Sum

This is the GAS project with Slack and Mendeley to manage papers.

## Dependencies

* Google Apps Script
* Mendeley
* Slack


## Setup

### GAS Authorization (Optional)

If you create a GAS project `directly`, you can skip this.

See https://github.com/danthareja/node-google-apps-script

1. Download credentials

    ```
    mv /path/to/client_secret_*.apps.googleusercontent.com.json ./
    ```

2. Authorization

    ```
    gapps auth ./client_secret_*.apps.googleusercontent.com.json
    ```

3. Download source files

    ```
    rm ./gapps.config.json # if it exitsts

    # For example, '//script.google.com/a/google.com/d/<file_id>/edit?usp=drive_web'
    gapps init <file_id>
    ```

### Mendeley credentials

* Get Mendeley App ID & Secret

### Google Spreadsheet

* Get Spreadsheet ID

### Slack Webhook

* Get Slack Incoming URL

### Configuration file under src

```
touch ./src/config.js
```


Sample `config.js` is below.

```
/*
 Mendeley information
 */
var MENDELEY_APP_ID = "<mendeley_app_id>";
var MENDELEY_APP_NAME = "<mendeley_app_name>";
var MENDELEY_APP_SECRET = "<mendeley_app_secret>";
var MENDELEY_APP_REDIRECT_URL = "https://script.google.com/macros/s/<gas_project_id>/usercallback";
var MENDELEY_APP_REDIRECT_URL_ENCODED = encodeURIComponent(MENDELEY_APP_REDIRECT_URL);

var LAZY_SUM_GROUP_ID = "<lazy_sum_group_id>";
var S_FOLDER_ID = "<each_floder_id>";
var T_FOLDER_ID = "<each_floder_id>";

/*
 Google Drive information
 */
var MENDELEY_DATA_SHEET_ID = "<google_spreadsheet_id>";

/*
 Slack information
 */
var SLACK_INCOMING_URL = "<slack_incoming_url>";
var SECRETARY = {
  "name": "秘書美",
  "icon": ":information_desk_person:"
};
var PIGGY = {
  "name": "貯金箱",
  "icon": ":piggy:"
};
```


## Calendar Visualization

https://script.google.com/macros/s/AKfycbxWzKuXAdsuDto7puvS5ZdUwK5Kl8KFuaML4Fb2v0o_NOp2Jgn2/exec
