// timers.js
// =========
const utils = require('./utils');
const fs = require('fs');

var timers = {};
var idCount = 1;

var timersFile = '/app/data/timers.json';

function storeTimers() {
  var stringTimers = JSON.stringify( { "timers" : timers } );

  fs.writeFile(timersFile, stringTimers, function (err) {
    if (err) return console.log(err);
  });
}

function timerInit() {
  readTimers();
}

function readTimers() {
  fs.access(timersFile, fs.F_OK, (err) => {
    if (err) {
      return
    }

    // file exists
    fs.readFile(timersFile, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

      var dataParse = JSON.parse(data);

      if ( "timers" in dataParse ) {
        timers = dataParse.timers;
        for (key in timers) {
          var updated = timers[key]["updated"];
          if ( updated != "..." ) {
            updated = Date.parse(updated)
          }
          timers[key]["updated"] = updated;
          idCount += 1;
        }
      }

    });
  });
}

function timerNew(fields) {
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

  // Storing the timers
  storeTimers();
  return newId;
}

function timerRemove(id) {
  if ( id in timers ) {
    delete timers[id];
    storeTimers();
    return {"success": "removed"};
  }
  return {"error": "id not found"}
}

function timerUpdate(id) {
  if ( id in timers ) {
    timers[id].updated = new Date();
    storeTimers();
    return timerOutputID(parseInt(id));
  }
  return { "error": "Invalid ID" }
}

function timerOutput(updateRawTime=false) {
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
    if ( updateRawTime && timers[key]["updated"] != null ) {
      timer["updated"] = timers[key]["updated"].toString();
    } else if ( updateRawTime ) {
      timer["updated"] = "...";
    }
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
  timerOutputID: timerOutputID,
  timerInit: timerInit
};
