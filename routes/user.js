const express = require('express');
const userRouter = express.Router();
const models = require('../models');
module.exports = userRouter;

//get all users, do not change db
userRouter.get('/', (req, res) => models.User.findAll());
//get user by ID, do not change db
userRouter.get('/:id', (req, res) => models.User.findByID(req.params.id));
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
