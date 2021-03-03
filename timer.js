// timers.js
// =========
const utils = require('./utils');

var timers = {};
var idCount = 1;

function timerNew() {
  var newId = idCount.toString();
  idCount = idCount + 1;
  timers[newId] = { updated: null };
  return newId;
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
    timersArray.push({
      id: key,
      updated: updated
    })
  }
  return JSON.stringify( { "timers" : timersArray } );
}

function timerOutputID(id) {
  // do something for each key in the object
  var updated = timers[id.toString()]["updated"];
  if ( updated == null ) {
    updated = "...";
  } else {
    updated = utils.timeSince(updated) + " ago";
  }
  var timer = {
    id: id,
    updated: updated
  }
  return timer;
}

/* Exports */
module.exports = {
  timerNew: timerNew,
  timerUpdate: timerUpdate,
  timerOutput: timerOutput,
  timerOutputID: timerOutputID
};
