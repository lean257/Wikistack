const express = require('express');
const userRouter = express.Router();
const models = require('../models');
module.exports = userRouter;

//get all users, do not change db
userRouter.get('/', (req, res) =>
  models.User.findAll()
  .then(users => res.render('users', {users: users}))
  .catch(console.error)
);
//get user by ID, do not change db
userRouter.get('/:id', (req, res) =>
  Promise.all([
    models.Page.findAll({
      where: {
        authorId: req.params.id
     }
    }),
    models.User.findById(req.params.id)
  ])
  .then(result => res.render('userspage', {pages: result[0], user: result[1]})));
//post user to the db
userRouter.post('/', (req, res) => models.User.create({
  name: 'testName',
  email: 'email@test.com'
}));
//update user 123 in the db
userRouter.put('/:id', (req,res)=> models.User.update());
//delete
userRouter.delete('/:id', (req,res)=> {
  models.User.delete(req.params.id);
  res.redirect('/');
})
