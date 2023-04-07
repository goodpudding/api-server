'use strict';

require('dotenv').config();
const server = require('./src/server');
const PORT = process.env.PORT;
const { sequelize } = require('./src/models')

sequelize.sync()
.then(() => {
  server.start(PORT);
})
.catch(err => {
  console.log('SQL CONNECTION ERROR: ', err);
})
