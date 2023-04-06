'use strict';

const express = require('express');
const router = express.Router();
const { Cat } = require('../models/cat');
const validator = require('../middleware/validator');


router.get('/', readCat);
router.post('/',validator, createCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);

const data = [{name: 'Marshellow', age: 7, sex: 'm', breed: 'Siamese'}];

async function readCat(request, response, next) {
  // let {name} = request.query;
  let data = await Cat.findAll();
  response.status(200).json(data);
}

async function createCat(request, response, next) {
  const cat = await Cat.create(request.body);
  data.push(cat);
  response.status(200).json(cat);
}

function updateCat(request, response, next) {
  let id = request.params.id;
  const cat = {
    name: request.body.name,
    age: request.body.age,
    sex: request.body.sex,
    breed: request.body.breed,
    id: id
  }
  // update the array
  let index = id - 1;
  data[index] = cat;
  response.status(200).send(cat);
}

function deleteCat(request, response, next) {
  let id = request.params.id;
  Cat.findByIdAndDelete(id);
  res.status(200).send('Cat deleted');
}

module.exports = router;
