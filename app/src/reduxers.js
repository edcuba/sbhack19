import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { takeLatest } from 'redux-saga/effects'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

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

