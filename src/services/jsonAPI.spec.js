const { expect } = require('chai');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const jsonAPIService = require('./jsonAPI');

describe('[Service] JSON API Service', () => {
  it('is an instance of JSONAPISerializer', () => {
    expect(jsonAPIService instanceof JSONAPISerializer).to.be.true;
  });

  it('has a collectionName of "blog-posts"', () => {
    expect(jsonAPIService.collectionName).to.equal('blog-posts');
  });

  describe('it has attributes:', () => {
    [
      'author',
      'content',
      'date',
      'image',
      'preview',
      'slug',
      'title',
    ].forEach((attribute) => {
      it(attribute, () => {
        expect(jsonAPIService.opts.attributes.indexOf(attribute) !== -1);
      });
    });
  });
});
