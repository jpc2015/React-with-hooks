import * as React from 'react';
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk';

import "./styles/main.less";
import App from './components/App';
import { reducer } from './store/reducers'

const store = createStore(reducer, applyMiddleware(reduxThunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);