// Require
const express = require('express');
const flexjson = require('jsonflex')();
const compression = require('compression');
const exphbs = require('express-handlebars');

// Create express server
const app = express();

app.engine('.html', exphbs({
  extname: '.html',
  defaultLayout: 'main'
}));
app.set('view engine', '.html');


// Express middleware
app.use(compression());
app.use(flexjson);
app.use(express.static('www'));

// Start server
app.listen(3000, () =>
  console.log('Webserver listening on port 3000')
);
