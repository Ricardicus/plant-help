const express = require('express');
const cors = require('cors');
const timer = require('./timer');
const app = express();

app.get('/api/timerNew', cors(), (req, res) => {
  var newID = timer.timerNew();
  res.json(timer.timerOutputID(newID));
});

app.get('/api/timerUpdate/:id', cors(), (req, res) => {
  var id = req.params.id;
  var result = timer.timerUpdate(id);
  res.json(result);
});

app.get('/api/timers', cors(), (req, res) => {
  res.json(timer.timerOutput());
});

const port = 5000;

app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});