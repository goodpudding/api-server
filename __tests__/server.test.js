"use strict";

const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);
const { sequelize, Cat, CatTreat } = require("../src/models");
const { response } = require("express");

beforeAll(async () => {
  await sequelize.sync();
  let catData1 = {
    name: "Marshmellow",
    age: 8,
    sex: "M",
    breed: "Siamese",
  };

  let catData2 = {
    name: "Graham",
    age: 4,
    sex: "F",
    breed: "American Longhair",
  };
  let catTreatData1 = {
    name: "Squeezables",
    price: 8,
    flavor: "Mixed",
    type: "Wet",
    catId: 1
  };

  let catTreatData2 = {
    name: "Chewies",
    price: 5,
    flavor: "Fish",
    type: "Dry",
    catId: 2
  };



  await Cat.create(catData1);
  await Cat.create(catData2);
  await CatTreat.create(catTreatData1);
  await CatTreat.create(catTreatData2);
});

afterAll(async () => {
  await sequelize.drop();
});

describe("Testing server for cats", () => {
  test("This should come back with 404 on a bad route", async () => {
    const response = await request.get("/nowhere");
    expect(response.status).toEqual(404);
  });

  test("This should come back with 404 for bad method", async () => {
    const response = await request.patch("/cat");
    expect(response.status).toEqual(404);
  });

  test("This should come back with 200 if the read is successful", async () => {
    const response = await request.get("/cat");
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("This should come back with 200 if the read one is successful", async () => {
    let catId = 1;
    const response = await request.get(`/cat/${catId}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  test("This should come back with 200 if you can POST a cat", async () => {
    let catObj = {
      name: "Peanut butter Cup",
      age: 2,
      sex: "M",
      breed: "Tortoise",
    };
    const response = await request.post("/cat").send(catObj);
    expect(response.body.name).toEqual("Peanut butter Cup");
    expect(response.body).toBeTruthy();
  });

  test("This should come back with 200 if you can PUT a cat", async () => {
    let catId = 3;
    let toUpdate = await request.get(`/cat/${catId}`);
    let age = toUpdate.body.age;
    toUpdate.body.age ++;
    age ++;
    await request.put(`/cat/${catId}`).send(toUpdate.body);
    let response = await request.get(`/cat/${catId}`)
    expect(response.body.age).toEqual(3);
    expect(response.body).toBeTruthy();
  });

  test("This should come back with 200 if DELETE successful", async () => {
    let catId = 3;
    await request.delete(`/cat/${catId}`);
    let response = await request.get(`/cats/${catId}`);
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({});
  });

});

describe("Testing for cat treats", () => {
  test("This should come back with 200 if the read is successful", async () => {
    const response = await request.get("/cattreats");
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("This should come back with 200 if the read one is successful", async () => {
    let catId = 1;
    const response = await request.get(`/cattreats/${catId}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  test("This should come back with 200 if you can POST a cat", async () => {
    let catTreatObj = {
      name: "Meowie Wowie",
      price: 6,
      flavor: "Herbal",
      type: "cat nip",
      catId: 2,
    };
    const response = await request.post("/cattreats").send(catTreatObj);
    expect(response.body.name).toEqual("Meowie Wowie");
    expect(response.body).toBeTruthy();
  });

  test("This should come back with 200 if you can PUT a cat", async () => {
    let catTreatId = 3;
    let toUpdate = await request.get(`/cattreats/${catTreatId}`);
    console.log(toUpdate.body)
    let price = toUpdate.body.price;
    toUpdate.body.price ++;
    price ++;
    await request.put(`/cat/${catTreatId}`).send(toUpdate.body);
    let response = await request.get(`/cattreats/${catTreatId}`)
    expect(response.body.price).toEqual(6);
    expect(response.body).toBeTruthy();
  });

  test("This should come back with 200 if DELETE successful", async () => {
    let catTreatId = 3;
    await request.delete(`/cattreats/${catTreatId}`);
    let response = await request.get(`/cattreats/${catTreatId}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(null);
  });
})
