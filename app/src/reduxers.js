import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'
import { takeLatest, put, call } from 'redux-saga/effects'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { contractAddress, contractABI, httpProvider, courierKey } from "./config";
import { ethers } from "ethers";
const Web3 = require('web3');


const persistConfig = {
  key: 'root',
  storage,
}

function keys(state = [], action) {
  if (action.type === "SAVE_KEY") {
    return [...state, action.payload];
  }
  if (action.type === "RESET") {
    return [];
  }
  return state;
}

function filter(state = null, action) {
  if (action.type === "FILTER") {
    return action.payload;
  }
  if (action.type === "RESET") {
    return null;
  }
  return state;
}

const reducer = combineReducers({
  keys,
  filter,
});

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

const persistor = persistStore(store)

function* addKey(data) {
  const { privateKey, trackingId } = data;
  yield put({ type: "SAVE_KEY", payload: { privateKey, trackingId } });
}

function* takeOwnership(data) {
  const { trackingId } = data;

  const wallet = new ethers.Wallet(courierKey, httpProvider);
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  yield call([contract, contract.takeOwnership], trackingId);

  yield put({ type: "SAVE_KEY", payload: { trackingId } });
}

function* resolveIdentity(data) {
  const { hash, signature } = data;

  // get the block from the network
  let block;
  try {
    block = yield call([httpProvider, httpProvider.getBlock], hash);
  } catch (e) {
    return alert("Failed to fetch the block: " + e);
  }

  const { timestamp } = block;

  const passed = Date.now() / 1000 - timestamp;

  if (passed > 600) {
    return alert("Block older than 10 minutes");
  }

  const web3 = new Web3();
  const recovered = web3.eth.accounts.recover(hash, signature);

  yield put({ type: "FILTER", payload: recovered });
}

function* loadScanData(action) {
  let data;

  try {
    data = JSON.parse(action.payload);
  } catch(e) {
    return alert(e);
  }

  if (data.hash) {
    // proof of identity
    yield call(resolveIdentity, data)
  } else if (data.privateKey) {
    yield call(addKey, data);
  } else if (data.trackingId) {
    yield call(takeOwnership, data);
  }
}


function* mySaga() {
  yield takeLatest("LOAD_SCAN_DATA", loadScanData);
}

sagaMiddleware.run(mySaga)

export default store;

export { persistor };
