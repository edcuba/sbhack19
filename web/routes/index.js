var express = require('express');
var router = express.Router();
var crypto = require("crypto");

const abi = require("../abi/contract.json");

const Web3 = require('web3');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shop' });
});

const pk = "0x8df7ac4a5c1bd5c30f5b5b2f02c76b5e5776376f260e0d9693f323a53170dd54";
const courierPk = "0x15d5e27c479554fccba4ecb00b661879658e32604332bb7826f99fa3b7899a76";
const contractAddress = "0x963aa6120c4cc1acb217484f7848ef24f34b2cf3";


const gas = 6721974;

router.get('/new', async function(req, res, next) {

  const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.225.60:8545'));

  const account = web3.eth.accounts.create();
  web3.eth.accounts.wallet.add(account);

  const courier = web3.eth.accounts.privateKeyToAccount(courierPk);
  web3.eth.accounts.wallet.add(courier);

  const shop = web3.eth.accounts.privateKeyToAccount(pk);
  web3.eth.accounts.wallet.add(shop);

  const contract = new web3.eth.Contract(abi, contractAddress);

  const trackingId = crypto.randomBytes(20).toString('hex');

  let result = await contract.methods.registerParcel(trackingId, account.address).send({
    from: shop.address,
    gas,
  });

  console.log("Register: ", result);

  // fill up user wallet
  result = await web3.eth.sendTransaction({
    from: shop.address,
    to: account.address,
    value: web3.utils.toWei("0.1", "ether"),
    gas,
  });

  console.log("Send: ", result);

  result = await contract.methods.giveConsent(trackingId, courier.address).send({
    from: account.address,
    gas,
  });

  console.log("Give consent: ", result);

  /* Ownership assigment
  result = await contract.methods.takeOwnership(trackingId).send({
    from: courier.address,
    gas,
  });

  console.log("Take ownership: ", result);
  */

  res.render('new', {
    title: 'New Parcel',
    trackingId,
    content: JSON.stringify({
      privateKey: account.privateKey,
      trackingId: trackingId,
    }),
    packageLabel: JSON.stringify({
      trackingId: trackingId,
    })
  });
});

module.exports = router;
