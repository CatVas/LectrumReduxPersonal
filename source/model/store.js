
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMV from 'redux-saga';
import reducer from './reducer';
import sagas from './sagas';

const reduxDevToolsCompose = typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const enhancers = reduxDevToolsCompose || compose;
const sagaMV = createSagaMV();

const store = createStore(reducer, enhancers(
    applyMiddleware(sagaMV),
));

sagaMV.run(sagas);

export default store;
