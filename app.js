const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const nunjucks = require('nunjucks');
const app = express();
const path = require('path');


const models = require('./models');

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

// models.User.sync({})
//   .then(() => models.Page.sync({}))
//   .then(app.listen(3000, () => console.log('Listening on port 3000...')))
//   .catch(console.error);

models.db.sync()
  .then(app.listen(3000, () => console.log('Listening on port 3000...')))
  .catch(console.error);

app.use('/', routes);
