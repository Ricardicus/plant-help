// utils.js
// ========

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    let years = Math.floor(interval);
    return years + " year" + (years === 1 ? "" : "s");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    let months = Math.floor(interval);
    return months + " month" + (months === 1 ? "" : "s");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    let days = Math.floor(interval);
    return days + " day" + ( days === 1 ? "" : "s");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    let hours = Math.floor(interval);
    return hours + " hour" + ( hours === 1 ? "" : "s");
  }
  interval = seconds / 60;
  if (interval > 1) {
    let minutes = Math.floor(interval);
    return minutes + " minute" + ( minutes === 1 ? "" : "s");
  }
  let secs = Math.floor(seconds)
  return Math.floor(secs) + " second" + ( secs === 1 ? "" : "s");
}

module.exports = {
  timeSince: timeSince
};