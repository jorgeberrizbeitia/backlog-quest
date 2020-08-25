import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="Your name here"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="And your password here"
            />
          </div>
<div className="sign-btn">

          <input className="btn btn-primary" type="submit" value="Login" />
</div>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
