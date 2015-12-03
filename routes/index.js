var express = require('express');
var router = express.Router();

router.use('/input', require('./input'));

/* GET Default page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
