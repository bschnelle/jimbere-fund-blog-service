const { expect } = require('chai');
const create = require('./create');

describe('create()', () => {
  it('returns a body with a message prop', () => {
    create(null, null, (err, response) => {
      expect(JSON.parse(response.body).message).to.exist;
    });
  });
});
