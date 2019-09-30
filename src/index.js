import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore,combineReducers, applyMiddleware, compose} from 'redux'
import profiles from './store/reducers/profiles'
// import dummy from './store/reducers/dummy'
// npm install --save redux

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    profiles: profiles,
    //dummy: dummy
})
const persistedState =
 localStorage.getItem('reduxState') ?
 JSON.parse(localStorage.getItem('reduxState')) :  {}
 console.log(persistedState)
const store = createStore(rootReducer,persistedState,composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));




store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })


const app = (
    <Provider store={store}>
    <App />
    </Provider>
    );

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
