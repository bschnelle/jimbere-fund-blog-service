/* eslint-disable no-underscore-dangle */
const { expect } = require('chai');
const sinon = require('sinon');
const { ElasticSearchService } = require('./elasticSearch');

// TODO sync AWS ES version with local ES or script creation on test ES

describe('[Service] ElasticSearch', () => {
  const doc = { author: 'Some Body', content: 'Some content' };
  let esService;
  const index = 'blog';
  const type = 'post';

  before(() => {
    esService = new ElasticSearchService('http://localhost:9200');
  });

  after((done) => {
    esService.client.indices.delete({ index }).then(() => done());
  });

  describe('create()', () => {
    let response;

    beforeEach((done) => {
      esService.create(doc).then((res) => {
        response = res;
        done();
      });
    });

    it('calls client.create with a well formed payload', () => {
      sinon.stub(esService.client, 'create');
      esService.create(doc);
      const payload = { index, type, body: doc };
      expect(esService.client.create).to.have.been.calledWith(payload);
      esService.client.create.restore();
    });

    describe('returns a response with props:', () => {
      it('_index = "blog"', () => {
        expect(response._index).to.equal('blog');
      });

      it('_type = "post"', () => {
        expect(response._type).to.equal('post');
      });

      it('created = true', () => {
        expect(response.created).to.be.true;
      });
    });
  });

  describe('delete()', () => {
    let response;

    beforeEach((done) => {
      const payload = { index, type, body: doc };
      esService.client.create(payload).then((res) => {
        response = res;
        done();
      });
    });

    it('calls client.delete with a well formed payload', () => {
      sinon.stub(esService.client, 'delete');
      esService.delete(response._id);
      const payload = { index, type, id: response._id };
      expect(esService.client.delete).to.have.been.calledWith(payload);
      esService.client.delete.restore();
    });

    describe('returns a response with props:', () => {
      let deleteResponse;

      beforeEach((done) => {
        esService.delete(response._id).then((res) => {
          deleteResponse = res;
          done();
        });
      });

      it('_index = "blog"', () => {
        expect(deleteResponse._index).to.equal('blog');
      });

      it('_type = "post"', () => {
        expect(deleteResponse._type).to.equal('post');
      });

      it('found = true', () => {
        expect(deleteResponse.found).to.be.true;
      });

      it('_id = argument id', () => {
        expect(deleteResponse._id).to.equal(response._id);
      });
    });
  });

  describe('read()', () => {
    let response;

    beforeEach((done) => {
      const payload = { index, type, body: doc };
      esService.client.create(payload).then((res) => {
        response = res;
        done();
      });
    });

    it('calls client.get with a well formed payload', () => {
      sinon.stub(esService.client, 'get');
      esService.read(response._id);
      const payload = { index, type, id: response._id };
      expect(esService.client.get).to.have.been.calledWith(payload);
      esService.client.get.restore();
    });

    describe('returns a response with props:', () => {
      let readResponse;

      beforeEach((done) => {
        esService.read(response._id).then((res) => {
          readResponse = res;
          done();
        });
      });

      it('_index = "blog"', () => {
        expect(readResponse._index).to.equal('blog');
      });

      it('_type = "post"', () => {
        expect(readResponse._type).to.equal('post');
      });

      it('found = true', () => {
        expect(readResponse.found).to.be.true;
      });

      it('_source = doc', () => {
        expect(readResponse._source.author).to.equal(doc.author);
        expect(readResponse._source.content).to.equal(doc.content);
      });
    });
  });

  describe('update()', () => {
    let response;
    const update = { content: 'Something new' };

    beforeEach((done) => {
      const payload = { index, type, body: { thing: 'stuff' } };
      esService.client.create(payload).then((res) => {
        response = res;
        done();
      });
    });

    it('calls client.update with a well formed payload', () => {
      sinon.stub(esService.client, 'update');
      esService.update(response._id, update);
      const payload = { body: { doc: update }, index, type, id: response._id };
      expect(esService.client.update).to.have.been.calledWith(payload);
      esService.client.update.restore();
    });

    describe('returns a response with props:', () => {
      let updateResponse;

      beforeEach((done) => {
        esService.update(response._id, update).then((res) => {
          updateResponse = res;
          done();
        });
      });

      it('_index = "blog"', () => {
        expect(updateResponse._index).to.equal('blog');
      });

      it('_type = "post"', () => {
        expect(updateResponse._type).to.equal('post');
      });

      it('_id = argument id', () => {
        expect(updateResponse._id).to.equal(response._id);
      });
    });
  });
});
