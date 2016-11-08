const { expect } = require('chai');
const del = require('./delete');

describe('delete()', () => {
  it('returns a body with a message prop', () => {
    del(null, null, (err, response) => {
      expect(JSON.parse(response.body).message).to.exist;
    });
  });
});
