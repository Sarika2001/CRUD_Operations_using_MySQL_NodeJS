var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {//Whenever path matches handler gets executed
  res.render('index', { title: 'Express Framework' });
});

module.exports = router;

