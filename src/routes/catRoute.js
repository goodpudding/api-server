'use strict';

const express = require('express');
const router = express.Router();
const { Cat } = require('../models');


router.get('/', readCat);
router.get('/:id', readPluralCats);
router.post('/', createCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);


async function readCat(request, response, next) {
 let data = await Cat.read();
 response.json(data);
}

async function readPluralCats(request, response, next) {
  const catId = request.params.id;
  let data = await Cat.read(catId);
  response.json(data);
}

async function createCat(request, response, next) {
  const createCat = await Cat.create(request.body);
  response.json(createCat);
}

async function updateCat(request, response, next) {
  let catId = request.params.id;
  const catObj = {
    name: request.body.name,
    age: request.body.age,
    sex: request.body.sex,
    breed: request.body.breed,
  }
  const results = Cat.update(catId, catObj);
  response.json(results);

}

async function deleteCat(request, response, next) {
  let catId = request.params.id;
  await Cat.delete(catId);
  const results = await Cat.read();
  response.json(results);
}

module.exports = router;
