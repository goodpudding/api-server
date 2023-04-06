"use strict";

const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);
const { sequelize, Cat, CatTreat} = require("../src/models");

beforeAll(async () => {
  await sequelize.sync();
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

  test("This should come back with 200 if you can POST a cat", async () => {
    let catObj = await Cat.create({
      name: "Graham",
      age: 7,
      sex: "m",
      breed: "Siamese",
    });
    expect(catObj.name).toEqual('Graham');
    expect(response.body).toBeTruthy();
  });
});