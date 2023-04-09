'use strict';

//Using index.js to bring in sequelize and then passing it on to the models
const { Sequelize } = require('sequelize');
const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';
const CreateCat = require('./cat');
const CreateCatTreat = require('./catTreat');
const Collection = require('./Collection')
const sequelize = new Sequelize(SQL_URL);
const CatModel = CreateCat(sequelize);
const CatTreatModel = CreateCatTreat(sequelize);

CatModel.hasMany(CatTreatModel, {foreignKey: 'catId', sourceKey: 'id'});
CatTreatModel.belongsTo(CatModel, {foreignKey: 'catId', targetKey:'id'});
module.exports = {
  sequelize,
  Cat: new Collection (CatModel),
  CatTreat: new Collection (CatTreatModel)
};
