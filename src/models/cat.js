'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

// defines a table
const Cat = sequelize.define("Cat", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sex: {
    type: DataTypes.ENUM('m', 'f'),
    allowNull: false
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = {
  Cat,
};
