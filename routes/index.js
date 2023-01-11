var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express hi' });
});

module.exports = router;
// .get(cors.cors, (req,res,next) => {
//   Products.find(req.query)
//   .then((products) => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json');
//       res.json(products);
//       console.log(req.body);
//       console.log(req.headers);
//   }, (err) => next(err))
//   .catch((err) => next(err));
// })