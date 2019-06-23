# SBHACK19 Team48 - Ostblock

GitHub repo: https://github.com/edynox/sbhack19

## Application
Core of our solution is an iOS app which directly communicates with a Smart Contract - since public beta review takes few days, we'll happy to provide you our test phones, or install the app on yours. We tried to demo the functionality in the video.

## Flow

### API for online retailers

When the user selects the warehouse and submits the order, our API creates a new parcel on the blockchain, gives consent to the warehouse to take over the package and transmits the credentials to the user.

### Mobile app

React Native based mobile application integrated with web3.js and ethers.js.

### Smart contract

We use a smart contract written in Solidity deployed on an Ethereum ledger.

Our contract is deployed on TrustSquare Avado Ethereum Göerli test node.

You can find it at address: `0xCc4cbc23426ee9864b5d2c9674d2E16F2e702ffc`

## General description

Welcome to the track and trust - decentralized storage network for solving the last mile delivery problem. What we can do, is to create trust between the delivery companies, customers and any 3rd party, that wants to help  delivering process. So, what is the example of a last mile delivery problem? Well, it costs a lot for a company to deliver a parcel to the door of a customer, especially when it is not at home. What we  do, is to allow customer to pick up the parcel from the nearest convinient location from our network, which is independant from the delivery company.

Any public place in the city, like coffeshop or museum, can become a middle point for storing a parcel by registering in our network. They will receive a small fee from storing each parcel. How we can ensure the trust between the parties? They will need to register and put a deposit in case the parcel will be lost.

When purchasing a product, customer selects a nearest convinient place from a large network of warehouses. Thats how a customer gives it consent for a delivery company to send a package there. A coureer then brings a package to the warehouse. He checks that the storehouse should receive the packages. The storehouse then makes sure it is the right package, and takes a responsibility for it. A customer receives the notification and goes to pick up a package. The storehouse authenticate the customer by unique QR code, and customer receives the package. What we can do more, is to extend trust chain and introduce any other 3rd parties delivering packages between warehouses and the customer.

By puting a deposit based on the reputation system, we will ensure that our sustomers will not lose their money. By making time of handling the parcels between the parties transperent, we store the responsibility on blockchain, and create trust between them. By making delivery system decentralized, we solved the last mile problem, and makes our customers happy.