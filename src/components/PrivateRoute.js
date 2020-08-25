import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/Auth";

// function that returns the route with the component passed as props only if the user is logged in. (isLogged in is passed through context)
function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={function(props) {
        if (isLoggedIn) return <Component {...props} />;
        else if (!isLoggedIn) return <Redirect to="/login" />;
      }}
    />
  );
}

export default withAuth(PrivateRoute);
