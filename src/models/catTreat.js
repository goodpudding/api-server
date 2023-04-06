'use strict';

const { DataTypes } = require('sequelize');

const CatTreat = (sequelize) => sequelize.define("CatTreat", {
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

module.exports = CatTreat;
