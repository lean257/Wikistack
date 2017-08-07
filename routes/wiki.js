const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');

//retrieve all wiki pages
wikiRouter.get('/', (req, res, next) => res.redirect('/'));
//submit a new page to db
wikiRouter.post('/', (req,res) => {
  models.User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(values => {
    var user = values[0];
    return models.Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    })
    .then(page => page.setAuthor(user))
    .catch(console.error);
  })
  .then(page => res.redirect(page.route))
  .catch(console.error);
});

//retrieve the added page form
wikiRouter.get('/add', (req, res, next) => res.render('addpage'));

//get individual page
wikiRouter.get('/:urlTitle', (req, res) => {
  //include method can be used to join models instead of below method:
  models.Page.findOne({
    where: {urlTitle: req.params.urlTitle},
  })
  .then(page => {
    page.getAuthor().then(author => author.dataValues)
      .then(author =>
        res.render('wikipage', {page: page, author: author})
      )
  })
  .catch(console.error);
});

module.exports = wikiRouter;
