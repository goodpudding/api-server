'use strict';

const express = require('express');
const router = express.Router();
const { Cat } = require('../models/cat');


router.get('/', readCat);
router.get('/:id', readPluralCats);
router.post('/', createCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);


async function readCat(request, response, next) {
  // let {name} = request.query;
  try {
  let data = await Cat.findAll();
  response.status(200).json(data);
} catch (error) {
    console.log(' readCat Error: ', error);
  }
}

async function readPluralCats(request, response, next) {
  console.log('Test message')
  let id = request.params.id;
  try {
  let data = await Cat.findOne( {where:{id}});
  response.status(200).json(data);
} catch (error) {
    console.log(' readPluralCats Error: ', error);
  }
}

async function createCat(request, response, next) {
  try {
  const catObj = await Cat.create(request.body);
  response.status(200).json(catObj);
  } catch (error) {
    console.log('createCat Error: ', error);
  }
}

async function updateCat(request, response, next) {
  let id = request.params.id;
  try {
  const catObj = {
    name: request.body.name,
    age: request.body.age,
    sex: request.body.sex,
    breed: request.body.breed,
  }
  // update the array
 const catUpdate = await Cat.findOne({where:{id}});
 const results = await catUpdate.update(catObj);
  response.status(200).send(results);
  } catch (error) {
    console.log('updateCat Error: ', error);
  }
}

async function deleteCat(request, response, next) {
  let id = request.params.id;
  try {
    let catToDelete = await Cat.findOne({where:{id}});
  await catToDelete.destroy();
  response.status(200).send('Cat deleted');    
  } catch (error) {
    console.log('deleteCat Error: ', error);
  }
}

module.exports = router;
