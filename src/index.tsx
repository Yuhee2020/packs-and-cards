import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './ui/App';
import reportWebVitals from './reportWebVitals';
import {store} from "./store/store";
import {HashRouter} from "react-router-dom";
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
);

reportWebVitals();
