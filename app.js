const express = require('express');
const body-parser = require('body-parser');
const route = require('./routes');
const nunjucks = require('nunjucks')
express.static('./public');

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
