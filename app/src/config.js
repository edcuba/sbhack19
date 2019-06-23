
import { ethers } from "ethers";

const contractAddress = "0xbc072364afff0e5c434b6333c0f0b972b5d07779";
const contractABI = require("../abi/contract.json");
const httpProvider = new ethers.providers.JsonRpcProvider("http://192.168.225.60:8545");
const courierKey = "0xa1577af4de9633e1e13ade1168d983464f712cd784e3b73315845b1c29c535c9";

export {
  httpProvider,
  contractABI,
  contractAddress,
  courierKey,
}