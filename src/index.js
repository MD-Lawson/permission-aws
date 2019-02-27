import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store/index";
import axios from 'axios';
import Routes from './app/router';

import "./css/site.css";
import "../node_modules/react-toggle-switch/dist/css/switch.min.css";

//axios.defaults.baseURL = 'http://localhost:38399';
//axios.defaults.baseURL = 'http://localhost:3002';
//axios.defaults.baseURL = 'https://9wb0wt6jlf.execute-api.eu-west-2.amazonaws.com/test'
//axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

