var express = require('express');

const bodyParser = require('body-parser');

const User = require('../models/users');
var usersRouter = express.Router();
usersRouter.use(bodyParser.json());

/* GET users listing. */

usersRouter.route('/')
.get(function(req, res, next) {
  User.find(req.query)
  .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
      console.log(req.body);
      console.log(req.headers);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  User.create(req.body)
  .then((product) => {
      console.log('Product Created ', product);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(product);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = usersRouter;