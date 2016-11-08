const { expect } = require('chai');
const update = require('./update');

describe('update()', () => {
  it('returns a body with a message prop', () => {
    update(null, null, (err, response) => {
      expect(JSON.parse(response.body).message).to.exist;
    });
  });
});
