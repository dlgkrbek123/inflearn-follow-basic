import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage";
import LoginPage from "./components/views/LoginPage";
import RegisterPage from "./components/views/RegisterPage";
import "antd/dist/antd.css";
import withAuth from "./hoc/auth";

const LoginP = withAuth(LoginPage, false);
const RegisterP = withAuth(RegisterPage, false);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={withAuth(LandingPage, null)} />
        <Route path="/login">
          <LoginP />
        </Route>
        <Route path="/register">
          <RegisterP />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
