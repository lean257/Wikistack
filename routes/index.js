const express = require('express');
const router = express.Router();
const models = require('../models');

router.use('/wiki', require('./wiki.js'));
router.use('/users', require('./user.js'));

router.get('/', (req, res) => {
  models.Page.findAll({attributes: ['title', 'urlTitle']})
    // .then(pages => pages.map(page => page))
    // .then(titles => titles.forEach)
    .then(pages => res.render('index', {pages: pages}))
    .catch(console.error);
});


module.exports = router;
