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
} from "react-router-dom";
import { Space, Spin } from "antd";

const ErrorPage = lazy(() => import("./containers/ErrorPage/index"));
const UploadPage = lazy(() => import("./containers/UploadPage/UploadPage"));

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
        <Route path="/" exact component={UploadPage} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/upload" component={UploadPage} />
        <Redirect from="/404" to="/error" />
      </Switch>
    </Suspense>
  </Router>
);
ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
