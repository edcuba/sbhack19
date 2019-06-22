import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { takeLatest } from 'redux-saga/effects'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

const persistor = persistStore(store)

function reducer(state, action){
  return state;
}


function* fetchUser(action) {
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

sagaMiddleware.run(mySaga)

export default store;

export { persistor };
