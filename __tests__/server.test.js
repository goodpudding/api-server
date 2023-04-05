'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);

describe('Testing server', () => {
  test('This should come back with 404 on a bad route', async () => {
    const response = await request.get('/nowhere');
    expect(response.status).toEqual(404);
  });

  test('This should come back with 404 for bad method', async () => {
    const response = await request.put('/cats');
    expect(response.status).toEqual(404);
  });

  
  xtest('This should come back with 200 if the post is successful', async () => {
    const response = await request.post('/cats');
    expect(response.status).toEqual(200);
  });

  xtest('This should come back with 200 if you can get all the cats', async () => {
    const response = await request.get('/cats');
    expect(response.status).toEqual(200);
  });

  xtest('given an name in the query string, the output object is correct', async () => {
    const response = await request.get('/cats?name=marshmelloww');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject([{ name: 'marshmellow' }]);
  });
});