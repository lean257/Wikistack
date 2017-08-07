const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');

//retrieve all wiki pages
wikiRouter.get('/', (req, res, next) => res.redirect('/'));
//submit a new page to db
wikiRouter.post('/', (req,res) => {
  models.Page.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    authorID: models.User.findOne({
      where: {
        name: req.body.name
      },
      attributes: ['id']
    }).then(id => {
      if (id) {return id}
      else {
        models.User.create({
          name: req.body.name,
          email: req.body.email
        })
        .then(user => user.id)
      }
    })
  })
  .then(result => {
    res.redirect(result.route);
  })
  .catch(console.error)
});

//retrieve the added page form
wikiRouter.get('/add', (req, res, next) => res.render('addpage'));

//get individual page
wikiRouter.get('/:urlTitle', (req, res) => {
  models.Page.findOne({where: {urlTitle: req.params.urlTitle}})
  .then(page => {
    res.render('wikipage',{page: page})
  }).
  catch(console.error);
});

module.exports = wikiRouter;
