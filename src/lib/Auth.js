import React, { Component } from "react";
import authService from "./auth-service"; // IMPORT functions for axios requests to API
const { Consumer, Provider } = React.createContext();

// Consumer
const withAuth = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {({ login, signup, logout, user, isLoggedIn }) => {
            // Passing all props coming from Provider into the component in the parameter: withAuth(Component)
            return (
              <WrappedComponent
                user={user}
                isLoggedIn={isLoggedIn}
                login={login}
                signup={signup}
                logout={logout}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};


// // HOC - function component example of the same functionality
// function withAuthFunc(WrappedComponent) {
//   return function(props) {
//     // props will belong to the WrappedComponent
//     return (
//       <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
//     );
//   };
// }


// Provider
class AuthProvider extends React.Component {
  state = {
    // contains data about authentication
    isLoggedIn: false,
    user: null,
    isLoading: true
  };

  componentDidMount() {
    authService
      .me() // returns info only if the user has a cookie
      .then(user =>
        this.setState({ isLoggedIn: true, user: user, isLoading: false })
      )
      .catch(err =>
        this.setState({ isLoggedIn: false, user: null, isLoading: false })
      );
  }

  signup = (username, password, platforms) => {
    return authService
      .signup({ username, password, platforms })
      .then(user => this.setState({ isLoggedIn: true, user }))
      // .catch(err => console.log(err));
      // catch in Signup.js to show message
  };

  login = (username, password) => {
    authService
      .login({ username, password })
      .then(user => this.setState({ isLoggedIn: true, user }))
      .catch(err => console.log(err));
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedIn: false, user: null }))
      .catch(err => console.log(err));
  };

  render() {
    const { isLoading, isLoggedIn, user } = this.state;
    const { login, logout, signup } = this;

    // passing to the Consumer, all service calls from authService will be available everywhere the HOC withAuth is used.
    return (
      <Provider value={{ isLoading, isLoggedIn, user, login, logout, signup }}>
        {this.props.children}
      </Provider>
    );
    /*
      <Provider> `value={}` data will be available to all <Consumer> components 
    */
  }
}

export { withAuth, AuthProvider }; // to export multiple things we dont use default.

//      Consumer ,  Provider
