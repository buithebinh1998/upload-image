import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";
import { Space, Spin } from "antd";

const HomePage = lazy(() => import("./containers/HomePage/index"));
const ErrorPage = lazy(() => import("./containers/ErrorPage/index"));
const ProtectPage = lazy(() => import("./containers/ProtectedPage/index"));
const UploadPage = lazy(() => import("./containers/UploadPage/UploadPage"));

const PrivateRoute = () => {
  const auth = false;
  return auth ? (
    <ProtectPage />
  ) : (
    <div>
      You don't have permission.
      <p>
        <NavLink activeStyle={{ fontWeight: "bold", color: "red" }} to="/">
          Homepage
        </NavLink>
      </p>
    </div>
  );
};

const app = (
  <Router>
    <Suspense
      fallback={
        <Space size="middle" className="loading-spinner">
          <Spin size="large" />
        </Space>
      }
    >
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/upload" component={UploadPage} />
        <PrivateRoute path="/profile" />
        <Redirect from="/404" to="/error" />
      </Switch>
    </Suspense>
  </Router>
);
ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
