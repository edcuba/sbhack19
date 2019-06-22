var express = require('express');
var router = express.Router();

let bip39 = require("bip39");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shop' });
});

router.get('/new', function(req, res, next) {
  res.render('new', {
    title: 'New Parcel',
    content: bip39.generateMnemonic(128),
  });
});

module.exports = router;
