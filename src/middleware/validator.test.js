'use strict';

const validator = require('./validator');
describe('Testing the validator middleware', () => {
  xtest('Should validate that a name parameter is sent.', () => {
    const request = {
      query: {
        name: 'marshmellow',
        age: 7,
        sex: 'm',
        breed: 'Siamese'
      }
    };
    const response = {};
    // since we don;t want to build next function, we just need to make sure it's called.
    const next = jest.fn();
    // const next = function() {}

    validator(request, response, next);
    expect(request.query.name).toEqual("marshmellow");
    expect(next).toHaveBeenCalled();
  });

  xtest('If No message on the request, passes an error into next', () => {
    const request = {query: {}};
    const response = {};
    const next = jest.fn();

    validator(request, response, next);
    expect(next).toHaveBeenCalled();
  })
});
