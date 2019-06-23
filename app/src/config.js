
import { ethers } from "ethers";

const contractAddress = "0x963aa6120c4cc1acb217484f7848ef24f34b2cf3";
const contractABI = require("../abi/contract.json");
const httpProvider = new ethers.providers.JsonRpcProvider("http://192.168.225.60:8545");
const courierKey = "0x15d5e27c479554fccba4ecb00b661879658e32604332bb7826f99fa3b7899a76";

export {
  httpProvider,
  contractABI,
  contractAddress,
  courierKey,
}