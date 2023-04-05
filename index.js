'use strict';

require('dotenv').config();
const server = require('./src/server');
const { sequelize } = require('./src/models/cat')

sequelize.sync()
.then(() => {
  server.start(3001);
})
.catch(err => {
  console.log('SQL CONNECTION ERROR: ', err);
})
