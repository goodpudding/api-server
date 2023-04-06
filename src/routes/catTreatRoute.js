'use strict';

const express = require('express');
const router = express.Router();
const { CatTreat } = require('../models/catTreat');
const validator = require('../middleware/validator');


router.get('/', readCatTreat);
router.get('/:id', readPluralCatTreats);
router.post('/',validator, createCatTreat);
router.put('/:id', updateCatTreat);
router.delete('/:id', deleteCatTreat);

async function readCatTreat(request, response, next) {
  // let {name} = request.query;
  try {
  let data = await CatTreat.findAll();
  response.status(200).json(data);
} catch (error) {
    console.log(' readCatTreat Error: ', error);
  }
}

async function readPluralCatTreats(request, response, next) {
  console.log('Test message')
  let id = request.params.id;
  try {
  let data = await CatTreat.findOne( {where:{id}});
  response.status(200).json(data);
} catch (error) {
    console.log(' readPluralCatTreats Error: ', error);
  }
}

async function createCatTreat(request, response, next) {
  try {
  const catTreatObj = await CatTreat.create(request.body);
  response.status(200).json(catTreatObj);
  } catch (error) {
    console.log('createCatTreat Error: ', error);
  }
}

async function updateCatTreat(request, response, next) {
  let id = request.params.id;
  try {
  const catTreatObj = {
    name: request.body.name,
    price: request.body.price,
    flavor: request.body.flavor,
    type: request.body.type,
  }
  // update the array
 const catTreatUpdate = await CatTreat.findOne({where:{id}});
 const results = await catTreatUpdate.update(catTreatObj);
  response.status(200).send(results);
  } catch (error) {
    console.log('updateCatTreat Error: ', error);
  }
}

async function deleteCatTreat(request, response, next) {
  let id = request.params.id;
  try {
    let catTreatToDelete = await CatTreat.findOne({where:{id}});
  await catTreatToDelete.destroy();
  response.status(200).send('CatTreat deleted');    
  } catch (error) {
    console.log('deleteCatTreat Error: ', error);
  }
}

module.exports = router;
