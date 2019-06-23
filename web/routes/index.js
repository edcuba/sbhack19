var express = require('express');
var router = express.Router();
var crypto = require("crypto");

const abi = require("../abi/contract.json");

const Web3 = require('web3');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shop' });
});

const pk = "0x1d4f1d1e282bd2eb66f2a186a5cd01cdfeb05c8cce17d3600d4d1478b2018e16";
const courierPk = "0xa1577af4de9633e1e13ade1168d983464f712cd784e3b73315845b1c29c535c9";
const contractAddress = "0xbc072364afff0e5c434b6333c0f0b972b5d07779";


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

  const trackingId = `${Math.floor(Math.random() * 100000)}-${Math.floor(Math.random() * 1000)}`;

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
