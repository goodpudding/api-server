'use strict';

//how does the init file work???
const { sequelize, Cat } = require('./src/models/cat');

sequelize.sync().then(async () => {
  console.log('database initialized');

//create a cat object when the DB is initialized
  let newCat = await Cat.create({
    name: 'Graham',
    age: 4,
    sex: 'F',
    breed: 'American Longhair'
  });

  console.log('New Cat!!', newCat);

}).catch(error => console.log(error));
