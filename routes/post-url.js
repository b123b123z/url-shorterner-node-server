const validUrl = require('valid-url');
const shortid = require('shortid');
const { pool } = require('../config/config');

const postUrl = (request, response) => {
  const { longUrl } = request.body;

  if (validUrl.isUri(longUrl)) {
    try {
      const shortUrl = shortid.generate();
      pool.query('INSERT INTO urls (longUrl, shortUrl) VALUES ($1, $2)', [longUrl, shortUrl], error => {
        if (error) {
          console.log(error);
          throw error;
        }
        response.status(201).json(shortUrl);
      });
    } catch (err) {
      response.status(500).json('Server Error');
    }
  } else {
    response.status(401).json('Invalid URL supplied');
  }
};
module.exports = { postUrl };
