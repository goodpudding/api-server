'use strict';

const express = require('express');
const router = express.Router();
const { CatTreat } = require('../models');
const validator = require('../middleware/validator');


router.get('/', readCatTreat);
router.get('/:id', readPluralCatTreats);
router.post('/',validator, createCatTreat);
router.put('/:id', updateCatTreat);
router.delete('/:id', deleteCatTreat);

async function readCatTreat(request, response, next) {
  let data = await CatTreat.read();
  response.json(data);
  }


async function readPluralCatTreats(request, response, next) {
  const catTreatId = request.params.id;
  let data = await CatTreat.read(catTreatId);
  response.json(data);
}

async function createCatTreat(request, response, next) {
  const createCatTreat = await CatTreat.create(request.body);
  response.json(createCatTreat);
}

async function updateCatTreat(request, response, next) {
  let catTreatId = request.params.id;
  const catTreatObj = {
    name: request.body.name,
    age: request.body.age,
    sex: request.body.sex,
    breed: request.body.breed,
  }
  const results = CatTreat.update(catTreatId, catTreatObj);
  response.json(results);
}

async function deleteCatTreat(request, response, next) {
  let catTreatId = request.params.id;
  await CatTreat.delete(catTreatId);
  const results = await CatTreat.read();
  response.json(results);
}

module.exports = router;
