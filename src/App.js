import React from "react";
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
import VerifyPage from "./pages/VerifyPage";
import LogoutPage from "./pages/LogoutPage";
import ServicePage from "./pages/ServicePage";
import BookingPage from "./pages/BookingPage";

function App() {

    var hist = createBrowserHistory();

    return (
        <Router history={hist}>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/service/:id" exact component={ServicePage}/>
                <Route path="/booking/:id" exact component={BookingPage}/>
                <Route path="/login" exact component={LoginPage}/>
                <Route path="/logout" exact component={LogoutPage}/>
                <Route path="/signup" exact component={SignUpPage}/>
                <Route path="/verify" exact component={VerifyPage}/>
                <Route path="/social-events" exact component={SocialEventsPage}/>
                <Route path="/rent-equipment" exact component={EquipmentAndServicesPage}/>
                <Route path="/in-house-services" exact component={InHouseServicesPage}/>
                <Route path="/external-services" exact component={ExternalServicesPage}/>
            </Switch>
        </Router>
    );
}

export default App;