import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'
import { takeLatest, put, call } from 'redux-saga/effects'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { mnemonicToSeed } from "bip39";
import { fromMasterSeed } from "hdkey";

const persistConfig = {
  key: 'root',
  storage,
}

function keys(state = [], action) {
  if (action.type === "SAVE_KEY") {
    return [...state, action.payload];
  }
  return state;
}

const reducer = combineReducers({
  keys,
});

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

const persistor = persistStore(store)

function* addKey(action) {
  const { payload } = action;

  const seed = yield call(mnemonicToSeed, payload);
  const seedHex = seed.toString("hex")

  const hdkey = yield call(fromMasterSeed, new Buffer(seedHex, "hex"));

  const key = hdkey.derive("m/44'/60'/0'/0/0");

  const privateKey = key.privateKey.toString("hex");
  const publicKey = key.publicKey.toString("hex");

  yield put({ type: "SAVE_KEY", payload: { privateKey, publicKey } });
}

function* mySaga() {
  yield takeLatest("ADD_KEY", addKey);
}

sagaMiddleware.run(mySaga)

export default store;

export { persistor };
