/* eslint-disable no-underscore-dangle */
/* const esService = require('../services/elasticSearch').elasticSearchService;

const getPost = (res) => (esService.read(res._id))
const sendResponse = (res) => {
  const payload = {
    data: {
      type: 'post',

    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(jsonApiService.serialize(response._source))
  }
}

module.exports = (event, context, callback) => (
  esService.create(event.body)
    .then(getPost)
    .then(sendResponse)
    .catch(callback)
);
*/
