var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('glass', { title: 'GLASS PRINTING ROOM' });
});

module.exports = router;
