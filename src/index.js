import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router";

import "MaterialKitProReact/assets/scss/material-kit-pro-react.scss?v=1.9.0";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SocialEventsPage from "./pages/SocialEvents";
import EquipmentAndServicesPage from "./pages/EquipmentAndServicesPage";
import InHouseServicesPage from "./pages/InHouseServices";
import ExternalServicesPage from "./pages/ExternalServicesPage";

import Amplify from 'aws-amplify';
import config from './aws-exports'
import VerifyPage from "./pages/VerifyPage";
import ReduxStore from '../src/Redux/Store/ReduxStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';


Amplify.configure(config);

const {store, persistor} = ReduxStore()

var hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={hist}>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/signup" exact component={SignUpPage}/>
                    <Route path="/verify" exact component={VerifyPage}/>
                    <Route path="/social-events" exact component={SocialEventsPage}/>
                    <Route path="/rent-equipment" exact component={EquipmentAndServicesPage}/>
                    <Route path="/in-house-services" exact component={InHouseServicesPage}/>
                    <Route path="/external-services" exact component={ExternalServicesPage}/>
                </Switch>
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
