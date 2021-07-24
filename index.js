const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const validUrl = require('valid-url');
const shortid = require('shortid');
const { pool } = require('./config/config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getUrl = (request, response) => {
  const { shortUrl } = request.params;

  try {
    pool.query('SELECT * FROM urls where shortUrl = $1', [shortUrl], (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows[0]) {
        response.redirect(results.rows[0].longurl);
      } else {
        response.status(404).json('No URL Found');
      }
    });
  } catch (err) {
    response.status(500).json('Server Error');
  }
};

const postUrl = (request, response) => {
  const { longUrl } = request.body;

  if (validUrl.isUri(longUrl)) {
    try {
      const shortUrl = shortid.generate();
      pool.query('INSERT INTO urls (longUrl, shortUrl) VALUES ($1, $2)', [longUrl, shortUrl], error => {
        if (error) {
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

app.route('/urls').post(postUrl);
app.route('/:shortUrl').get(getUrl);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log('Server listening');
});
