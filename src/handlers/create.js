/* eslint-disable no-underscore-dangle */
const esService = require('../services/elasticSearch').elasticSearchService;
const jsonAPIService = require('../services/jsonAPI');

module.exports = (event, context, callback) => {
  const { body: post } = event;
  const getPost = res => (esService.read(res._id));
  const sendResponse = (res) => {
    let body = res._source;
    body.id = res._id;
    body = jsonAPIService.serialize(body);
    body = JSON.stringify(body);

    callback(null, { statusCode: 200, body });
  };

  return esService.create(post)
    .then(getPost)
    .then(sendResponse)
    .catch(callback);
};
