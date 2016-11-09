/* eslint-disable no-underscore-dangle */
const { expect } = require('chai');
const sinon = require('sinon');
const create = require('./create');
const esService = require('../services/elasticSearch').elasticSearchService;

const event = { body: { author: 'Drake', title: 'Views' } };
const createRes = { _id: 'abc123' };
const readRes = { _id: createRes._id, _source: event.body };

describe('create()', () => {
  beforeEach(() => {
    sinon.stub(esService, 'create').returns(Promise.resolve(createRes));
    sinon.stub(esService, 'read').returns(Promise.resolve(readRes));
  });

  afterEach(() => {
    esService.create.restore();
    esService.read.restore();
  });

  it('calls esService.create with event.body', (done) => {
    create(event, null, done);
    expect(esService.create).to.have.been.calledWith(event.body);
  });

  describe('on success', () => {
    it('calls esService.read with _id from esService.create result', (done) => {
      create(event, null, sinon.stub()).then(() => {
        expect(esService.read).to.have.been.calledWith(createRes._id);
        done();
      });
    });

    describe('calls callback with', () => {
      let callback;
      let error;
      let response;

      beforeEach(() => {
        callback = (err, res) => {
          error = err;
          response = res;
        };
      });

      it('error = null', (done) => {
        create(event, null, callback).then(() => {
          expect(error).to.be.null;
          done();
        });
      });

      it('response.statusCode = 200', (done) => {
        create(event, null, callback).then(() => {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });

      it('response.body = JSON API compliant body containing new document', (done) => {
        create(event, null, callback).then(() => {
          const body = JSON.parse(response.body);
          expect(body.data.id).to.equal(createRes._id);
          done();
        });
      });
    });
  });

  describe('on error', () => {
    it('if status is defined, returns error');
    it('if status is undefined, returns a 500');
  });
});
