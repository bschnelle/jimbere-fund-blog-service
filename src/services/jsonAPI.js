const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const attributes = [
  'author',
  'content',
  'date',
  'image',
  'preview',
  'slug',
  'title',
];

module.exports = new JSONAPISerializer('blog-posts', { attributes });
