'use strict';

const { sequelize, Cat } = require('./src/models/cat');

sequelize.sync().then(async () => {
  console.log('database initialized');

  let newCat = await Cat.create({
    name: 'Graham',
    age: 4,
    sex: 'F',
    breed: 'American Longhair'
  });

  console.log('New Cat!!', newCat);

}).catch(error => console.log(error));
