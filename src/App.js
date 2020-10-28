import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";

import Parts from "./components/Dashboard/Parts/Parts";
import Accessories from "./components/Dashboard/Accessories/Accessories";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="template">
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          {/* <PrivateRoute exact path="/dashboard/parts" component={Parts} /> */}
          <Switch>
            <Route
              exact
              path="/dashboard/parts"
              render={() => (
                <Dashboard>
                  <Parts />
                </Dashboard>
              )}
            />
            <Route
              exact
              path="/dashboard/accessories"
              render={() => (
                <Dashboard>
                  <Accessories />
                </Dashboard>
              )}
            />
          </Switch>
        </div>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* <Route path="*" render={() => <div>NOT FOUND</div>} /> */}
      </Router>
    </Provider>
  );
};

export default App;
