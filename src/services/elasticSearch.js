const elasticsearch = require('elasticsearch');

class ElasticSearchService {
  constructor(host) {
    this.payload = { index: 'blog', type: 'post' };
    const config = { apiVersion: '2.3', host };
    this.client = new elasticsearch.Client(config);

    ['create', 'delete', 'read', 'update'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  create(doc) {
    const payload = Object.assign({ body: doc }, this.payload);
    return this.client.create(payload);
  }

  delete(id) {
    const payload = Object.assign({ id }, this.payload);
    return this.client.delete(payload);
  }

  read(id) {
    const payload = Object.assign({ id }, this.payload);
    return this.client.get(payload);
  }

  update(id, doc) {
    const payload = Object.assign({ body: { doc }, id }, this.payload);
    return this.client.update(payload);
  }
}

const host = 'search-jimbere-fund-oge2g56zplj4pywb6ahugwqqmm.us-east-1.es.amazonaws.com';

module.exports = {
  ElasticSearchService,
  elasticSearchService: new ElasticSearchService(host),
};
