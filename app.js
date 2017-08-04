const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');
const nunjucks = require('nunjucks');
const app = express();
const path = require('path');


var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({extende: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', );
