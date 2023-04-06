'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const SQL_URL = process.env.SQL_URL || "sqlite:memory:";
const sequelize = new Sequelize(SQL_URL);

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
  sequelize,
  CatTreat,
};
