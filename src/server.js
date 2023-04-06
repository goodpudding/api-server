'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
const logger = require('./middleware/logger');
const serverError = require('./error-handlers/500');
const notFoundError = require('./error-handlers/404');
const catRoute = require('./routes/catRoute');
const catTreatRoute = require('./routes/catTreatRoute');

app.use(express.json());
app.use(cors());
app.use(logger);
app.use('/cats', catRoute);
app.use('/cattreats', catTreatRoute);

// app.get('/person',(request, response, next) => {
//   response.status(200).json(data);
// });

// app.post('/person', validator, (request, response, next) => {
//   data.push(request.query.name);
//   response.status(200).send({name: request.query.name});
// });

app.use('*', notFoundError);
app.use(serverError);


module.exports = {
  app,
  start: (port) => app.listen(port, () => {
    console.log('Server is listening on', port);
  }),
};