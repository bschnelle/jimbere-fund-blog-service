module.exports = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Update blog post!',
    }),
  };

  callback(null, response);
};
