var express = require('express');
var router = express.Router();
var crypto = require("crypto");

const Web3 = require('web3');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shop' });
});

router.get('/new', function(req, res, next) {

  const web3 = new Web3();
  const account = web3.eth.accounts.create();

  const trackingNumber = crypto.randomBytes(20).toString('hex');

  res.render('new', {
    title: 'New Parcel',
    trackingNumber,
    content: JSON.stringify({ privateKey: account.privateKey }),
  });
});

module.exports = router;
