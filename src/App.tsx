import React from 'react';
import { Provider } from 'react-redux';
import reducers from 'reducers/index.reducer';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas/index.saga';
import { BrowserRouter } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

import router from './router';

const App = (): React.ReactElement => (
  <Provider store={store}>
    <BrowserRouter>{router}</BrowserRouter>
  </Provider>
);

export default App;
