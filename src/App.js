import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Backlog from "./pages/Backlog";
import DoneList from "./pages/DoneList";
import AddMedia from "./pages/AddMedia";
import Profile from "./pages/Profile";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          {/* routes available for all users  */}
          <Route exact path="/" component={Home} />

          {/* routes only for users logged out  */}
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          {/* routes only for users logged in  */}
          <PrivateRoute exact path="/backlog" component={Backlog} />
          <PrivateRoute exact path="/done" component={DoneList} />
          <PrivateRoute exact path="/add-media" component={AddMedia} />
          <PrivateRoute exact path="/profile" component={Profile} />
          
        </Switch>

      </div>
    );
  }
}

export default App;
