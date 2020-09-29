import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>App</h1>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
