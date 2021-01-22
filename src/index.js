import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import "MaterialKitProReact/assets/scss/material-kit-pro-react.scss?v=1.9.0";

import StandardPage from "./views/StandardPage";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={StandardPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
