import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./scss/style.scss";

const loading = (
  <div id="content-page" className="content-page">
    <div className="container text-center mt-5">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Order = React.lazy(() => import("./views/pages/orders/orders"));
const Kitchen = React.lazy(() => import("./views/pages/kitchen/kitchen"));
const App =(props)=> {
  // render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
              <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              exact
              path="/orders"
              name="Order page"
              render={(props) => <Order {...props} />}
            />
            <Route
              exact
              path="/kitchens"
              name="Kitchen page"
              render={(props) => <Kitchen {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />

            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />                         
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};
export default connect(mapStateToProps)(App);
