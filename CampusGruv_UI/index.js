/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, compose} from 'redux';
import CombinedReducers from './ReduxStore/Reducers';


let composeEnhancer = compose;

if (__DEV__) {
  //Matlab agar development mode me hain tw
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //dev mode me devtools wala compose function use kare
}



mystore = createStore(CombinedReducers, composeEnhancer());

const RN_REDUX = () => {
  return (
    <Provider store={mystore}>
      <App></App>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RN_REDUX);
