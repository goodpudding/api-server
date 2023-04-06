"use strict";

const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);
const db = require("../src/models");

beforeAll(async () => {
  await db.sequelize.sync();
  // await db2.sequelize.sync();
});

afterAll(async () => {
  await db.sequelize.drop();
  // await db2.sequelize.drop();
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

  test("This should come back with 200 if you can POST a cat", async () => {
    let catObj = {
      name: "Graham",
      age: 7,
      sex: "m",
      breed: "Siamese",
    };
    const response = await request.post("/cat").send(catObj);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("This should come back with 200 if you can GET a single cat", async () => {
    let catObj1 = {
      name: "Graham",
      age: 7,
      sex: "m",
      breed: "Siamese",
    };
    let createCat = await request.post("/cat").send(catObj1);
    const response = await request.get(`/cat/${createCat.body.id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("This should come back with 200 if you can PUT a cat", async () => {
    let catObj1 = {
      name: "Graham",
      age: 7,
      sex: "m",
      breed: "Siamese",
    };
    let createCat = await request.post("/cat").send(catObj1);
    let catObj2 = {
      name: "Marshmellow",
      age: 7,
      sex: "m",
      breed: "Siamese",
    };
    const response = await request.put(`/cat/${createCat.body.id}`).send(catObj2);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("This should come back with 200 if you can DELETE a single cat", async () => {
    let catObj1 = {
      name: "Graham",
      age: 7,
      sex: "m",
      breed: "Siamese",
    };
    let createCat = await request.post("/cat").send(catObj1);
    const response = await request.delete(`/cat/${createCat.body.id}`);
    expect(response.status).toEqual(200);
  });
  
});



describe("Testing server for cat treats", () => {

  test("This should come back with 200 if the read is successful", async () => {
    const response = await request.get("/cattreats");
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("This should come back with 200 if you can POST a cat", async () => {
    let catTreatObj = {
      name: "yummy",
      price: 3,
      flavor: "salmon",
      type: "wet",
    };
    const response = await request.post("/cattreats").send(catTreatObj);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test("This should come back with 200 if you can GET a single cat treat", async () => {
    let catTreatObj1 = {
      name: "yummy",
      price: 3,
      flavor: "salmon",
      type: "wet",
    };
    let createCatTreat = await request.post("/cattreats").send(catTreatObj1);
    const response = await request.get(`/cattreats/${createCatTreat.body.id}`);
    expect(response.status).toEqual(200);
  });

  test("This should come back with 200 if you can PUT a cat", async () => {
    let catTreatObj1 = {
      name: "yummy",
      price: 3,
      flavor: "salmon",
      type: "wet",
    };
    let createCatTreat = await request.post("/cattreats").send(catTreatObj1);
    let catTreatObj2 = {
      name: "yummy",
      price: 2,
      flavor: "salmon",
      type: "wet",
    };
    const response = await request.put(`/cattreats/${createCatTreat.body.id}`).send(catTreatObj2);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

 

  test("This should come back with 200 if you can DELETE a single cat treat", async () => {
    let catTreatObj1 = {
      name: "yummy",
      price: 3,
      flavor: "salmon",
      type: "wet",
    };
    let createCatTreat = await request.post("/cattreats").send(catTreatObj1);
    const response = await request.delete(`/cattreats/${createCatTreat.body.id}`);
    expect(response.status).toEqual(200);
  });
  
});
