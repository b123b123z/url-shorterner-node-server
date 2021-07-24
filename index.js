const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { postUrl } = require('./routes/post-url');
const { getUrl } = require('./routes/get-url');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.route('/urls').post(postUrl);
app.route('/:shortUrl').get(getUrl);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log('Server listening');
});
