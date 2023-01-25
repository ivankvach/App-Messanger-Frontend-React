var express = require('express');
var passport = require('passport');
var authenticate = require('../authenticate');
var cors = require('cors');

const bodyParser = require('body-parser');

const User = require('../models/users');
var usersRouter = express.Router();
usersRouter.use(bodyParser.json());

/* GET users listing. */
// usersRouter.get('/', authenticate.verifyUser, (req, res, next) => {
usersRouter.route('/')
  //.get(authenticate.verifyUser, function (req, res, next) {
    .get(function (req, res, next) {
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

usersRouter.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username, password: req.body.password }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    });
});

usersRouter.post('/login', (req, res, next) => {
  console.log(req.body.password);
  User.find({ username: req.body.username, password: req.body.password })
    .then((users) => {
      if (users[0] != undefined) {
        console.log(users[0]._id);
        var token = authenticate.getToken({ _id: users[0]._id });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Login Successful!', token: token, user: users });
        console.log(users);
        console.log(req.headers);

      } else if (users[0] == undefined) {
        res.json({ success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = usersRouter;