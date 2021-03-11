// timers.js
// =========
const utils = require('./utils');
const mysql = require('mysql');

/* If connection OK store in DB */
var useMysql = false;
var connection;

/* "manual" id count, if SQL isn't used */
var idCount = 1;

var timers = {"0": {
  "description": "server-generated",
  "imgUrl": null,
  "hasImage": false,
  "updated": null
}};

function createTimerTableSQL() {
  var sql = "CREATE TABLE plants (\
  id int NOT NULL AUTO_INCREMENT,\
  imgUrl VARCHAR(300),\
  hasImage BOOLEAN,\
  description VARCHAR(255),\
  updated DATETIME);";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Plant-table created. Ready to serve!");
    useMysql = true;
  });
}

function initSQL() {
  connection = mysql.createConnection({
    host: "plant-help-mysql",
    user: "plant-help",
    password: "plant-help",
    database: "plant-help",
    insecureAuth : true
  });

  connection.connect((err) => {
    if(err){
      console.log('Error connecting to Db, all memory is volatile now.');
      console.log(err);
      return;
    }
    console.log('Connection established');
    createTimerTableSQL();
  });

}

/* Wait a while before trying to connect */
setTimeout(
  initSQL
, 20000);

function timerNew(fields) {
  if ( !useMysql ) {
    return timerNewNoSQL(fields);
  } else {
    return timerNewSQL(fields);
  }
}

/* No SQL Function */
function timerNewSQL(fields) {
  var newTimer = {
    "description": "...",
    "imgUrl": null,
    "hasImage": false,
    "updated": null
  };

  if ( "description" in fields ) {
    newTimer["description"] = fields["description"];
  }

  if ( "imgUrl" in fields ) {
    if ( fields["imgUrl"].includes(".") ) {
      newTimer["imgUrl"] = fields["imgUrl"];
      newTimer["hasImage"] = true;
    }
  }

  var sql = "INSERT INTO customers (description, imgUrl, hasImage) VALUES ('" +
  newTimer["description"] + "', '" + newTimer["imgUrl"] + ", '" + (
    newTimer["hasImage"] ? 'true' : 'false') + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("New timer register");
  });
}

/* No SQL Function */
function timerNewNoSQL(fields) {
  var newId = idCount.toString();
  idCount = idCount + 1;

  timers[newId] = {
    "description": "...",
    "imgUrl": null,
    "hasImage": false,
    "updated": null
  };

  if ( "description" in fields ) {
    timers[newId]["description"] = fields["description"];
  }

  if ( "imgUrl" in fields ) {
    if ( fields["imgUrl"].includes(".") ) {
      timers[newId]["imgUrl"] = fields["imgUrl"];
      timers[newId]["hasImage"] = true;
    }
  }

  timers[newId]["updated"] = null;
  return newId;
}

function timerRemove(id) {
  if ( id in timers ) {
    delete timers[id];
    return {"success": "removed"};
  }
  return {"error": "id not found"}
}

function timerUpdate(id) {
  if ( id in timers ) {
    timers[id].updated = new Date();
    return timerOutputID(parseInt(id));
  }
  return { "error": "Invalid ID" }
}

function timerOutput() {
  var timersArray = [];
  for (key in timers) {
    // do something for each key in the object
    var updated = timers[key]["updated"];
    if ( updated == null ) {
      updated = "...";
    } else {
      updated = utils.timeSince(updated) + " ago";
    }
    var timer = {};
    Object.assign(timer, timers[key]);
    timer["id"] = key;
    timer["updated"] = updated;
    timersArray.push(timer)
  }
  return JSON.stringify( { "timers" : timersArray } );
}

function timerOutputID(id) {
  // do something for each key in the object
  if (! id.toString() in timers ) {
    return {"error": "Not found"}
  }
  var updated = timers[id.toString()]["updated"];
  if ( updated == null ) {
    updated = "...";
  } else {
    updated = utils.timeSince(updated) + " ago";
  }
  var timer = {};
  Object.assign(timer, timers[id.toString()]);
  timer["id"] = id;
  timer["updated"] = updated;
  return timer;
}

/* Exports */
module.exports = {
  timerNew: timerNew,
  timerUpdate: timerUpdate,
  timerOutput: timerOutput,
  timerRemove: timerRemove,
  timerOutputID: timerOutputID
};
