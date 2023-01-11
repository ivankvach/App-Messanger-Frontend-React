var express = require('express');

const bodyParser = require('body-parser');

const Message = require('../models/message');
var messageRouter = express.Router();
messageRouter.use(bodyParser.json());

/* GET users listing. */

messageRouter.route('/')
.get(function(req, res, next) {
  Message.find({name:[req.headers.data, req.headers.datareverse]})
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
  Message.create(req.body)
  .then((product) => {
      console.log('Product Created ', product);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(product);
      console.log(req.headers.data);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = messageRouter;