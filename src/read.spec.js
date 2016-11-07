const { expect } = require('chai');
const read = require('./read');

describe('read()', () => {
  it('returns a body with a message prop', () => {
    read(null, null, (err, response) => {
      expect(JSON.parse(response.body).message).to.exist;
    });
  });
});
