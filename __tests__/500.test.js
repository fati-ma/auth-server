'use strict';
const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

require('../src/middleware/500.js');

describe('Errorhandler is working', () => {
  it('should respond with 500 on an error', async () => {
    await mockRequest.get('/error').then((results) => {
      expect(results.status).toBe(500);
    });
  });
});