import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import messageReducer from './redux/reducers/messageReducer';
import { insertMessage } from './redux/actions/messageActions';
import adminReducer from './redux/reducers/adminReducer';
import loginReducer from './redux/reducers/loginReducer';
import listingReducer from './redux/reducers/listingReducer'
import 'bootstrap/dist/css/bootstrap.min.css';




const rootReducer = combineReducers({
  messageReducer,adminReducer,listingReducer, loginReducer,
});


const store = createStore(rootReducer, applyMiddleware(thunk));

// const webSocket = new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket');
const webSocket = new WebSocket('ws://localhost:4007');

webSocket.onmessage = (message) => {
  console.log(message)
  store.dispatch(insertMessage(message.data));
};

ReactDOM.render(
  
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
