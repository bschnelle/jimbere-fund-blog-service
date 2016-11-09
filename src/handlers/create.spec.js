/* const { expect } = require('chai');
const sinon = require('sinon');
const create = require('./create');
const esService = require('../services/elasticSearch').elasticSearchService;

const event = { body: { author: 'Drake', title: 'Views' } };
const response = { id: 'abc123' };

describe('create()', () => {
  beforeEach(() => {
    sinon.stub(esService, 'create').returns(Promise.resolve(response));
  });

  afterEach(() => esService.create.restore());

  it('calls elasticSearchService.create with event.body', (done) => {
    create(event, null, done);
    expect(esService.create).to.have.been.calledWith(event.body);
  });

  describe('on success', () => {
    let callback;

    beforeEach(() => {
      callback = sinon.stub();
    });

    it('callback called with statusCode of 200 and body of stringified response', (done) => {
      create(event, null, callback).then(() => {
        const res = { statusCode: 200, body: JSON.stringify(response) };
        expect(callback).to.have.been.calledWith(null, res);
        done();
      });

      it('has a JSON API compliant body containing the new blog post document');
    });
  });

  describe('on error', () => {
    it('if status is defined, returns error');
    it('if status is undefined, returns a 500');
  });
});
*/
