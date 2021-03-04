const express = require('express');
const cors = require('cors');
const timer = require('./timer');
const app = express();

app.use(express.json()) 

app.post('/api/timerNew', cors(), (req, res) => {
  var newFields = {};
  var acceptedFields = ["imgUrl", "description"];
  var bodyParams = req.body;

  console.log(bodyParams);

  for (var i = 0; i < acceptedFields.length; i++ ) {
    if ( acceptedFields[i] in bodyParams ) {
      newFields[acceptedFields[i]] = bodyParams[acceptedFields[i]];
    }
  }

  var newID = timer.timerNew(newFields);
  res.json(timer.timerOutputID(newID));
});

app.get('/api/timerUpdate/:id', cors(), (req, res) => {
  var id = req.params.id;
  var result = timer.timerUpdate(id);
  res.json(result);
});

app.get('/api/timerRemove/:id', cors(), (req, res) => {
  var id = req.params.id;
  var result = timer.timerRemove(id);
  res.json(result);
});

app.get('/api/timers', cors(), (req, res) => {
  res.json(timer.timerOutput());
});

const port = 5000;

app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});