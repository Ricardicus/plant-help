// timers.js
// =========
const utils = require('./utils');

var timers = {"0": {
  "description": "server-generated",
  "imgUrl": null,
  "hasImage": false,
  "updated": null
}};
var idCount = 1;

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
