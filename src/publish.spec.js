const { expect } = require('chai');
const publish = require('./publish');

describe('publish()', () => {
  it('returns a body with a message prop', () => {
    publish(null, null, (err, response) => {
      expect(JSON.parse(response.body).message).to.exist;
    });
  });
});
