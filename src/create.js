module.exports = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Create blog post!',
    }),
  };

  callback(null, response);
};
