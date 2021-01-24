import React from "react";
import ReactDOM from "react-dom";
import "MaterialKitProReact/assets/scss/material-kit-pro-react.scss?v=1.9.0";


import Amplify from 'aws-amplify';
import config from './aws-exports'
import ReduxStore from '../src/Redux/Store/ReduxStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from "./App";


Amplify.configure(config);

const {store, persistor} = ReduxStore()

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
