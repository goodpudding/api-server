'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const CatTreat = sequelize.define("CatTreat", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  flavor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('dry', 'wet', 'cat nip'),
    allowNull: true
  }
});

module.exports = {
  CatTreat,
};
