'use strict';

const express = require('express');
const router = express.Router();
const { CatTreat } = require('../models/catTreat');
const validator = require('../middleware/validator');


router.get('/', readCatTreat);
router.post('/',validator, createCatTreat);
router.put('/:id', updateCatTreat);
router.delete('/:id', deleteCatTreat);

const data = [{name: 'Squeezables', price: 7, flavor: 'Assorted', type: 'wet'}];


async function readCatTreat(request, response, next) {
  let data = await CatTreat.findAll();
  response.json(data);
}

async function createCatTreat(request, response, next) {
  const catTreat = await CatTreat.create(request.body);
  response.json(catTreat);
}

function updateCatTreat(request, response, next) {
  let id = request.params.id;
  const catTreat = {
    name: request.body.name,
    age: request.body.age,
    sex: request.body.sex,
    breed: request.body.breed,
    id: id
  }
  // update the array
  let index = id - 1;
  data[index] = catTreat;
  response.status(200).send(catTreat);
}

function deleteCatTreat(request, response, next) {}

module.exports = router;
