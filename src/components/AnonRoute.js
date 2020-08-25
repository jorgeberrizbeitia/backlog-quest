import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/Auth";

// function that returns the route with the component passed as props only if the user is not logged in. (isLogged in is passed through context)
function AnonRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={function(props) {
        if (isLoggedIn) return <Redirect to="/backlog" />;
        else if (!isLoggedIn) return <Component {...props} />;
      }}
    />
  );
}

export default withAuth(AnonRoute);
