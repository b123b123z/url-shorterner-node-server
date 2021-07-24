const { pool } = require('../config/config');

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

module.exports = { getUrl };
