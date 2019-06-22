import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'
import { takeLatest, put, call } from 'redux-saga/effects'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ethereumHandle } from "./config";
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
  const { privateKey } = data;
  yield put({ type: "SAVE_KEY", payload: { privateKey } });
}

function* resolveIdentity(data) {
  const web3 = new Web3(ethereumHandle);

  const { hash, signature } = data;

  // get the block from the network
  let block;
  try {
    block = yield call([web3, web3.eth.getBlock], hash);
  } catch (e) {
    return alert("Failed to fetch the block: " + e);
  }

  const { timestamp } = block;

  const passed = Date.now() / 1000 - timestamp;

  /*if (passed > 600) {
    return alert("Block older than 10 minutes");
  }*/

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
  } else if (data.number) {
    // load of package number
    // TODO
  } else if (data.privateKey) {
    yield call(addKey, data);
  }
}


function* mySaga() {
  yield takeLatest("LOAD_SCAN_DATA", loadScanData);
}

sagaMiddleware.run(mySaga)

export default store;

export { persistor };
