import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    platforms: []
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, platforms } = this.state;

    this.props.signup(username, password, platforms);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  togglePlatform = event => {
    event.preventDefault();

    const { name } = event.target;
    let newPlatforms = this.state.platforms;

    if (newPlatforms.includes(name)) {
      newPlatforms.splice(newPlatforms.indexOf(name), 1);
    } else {
      newPlatforms.push(name);
    }

    this.setState({ platforms: newPlatforms });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <br/>
          <button onClick={this.togglePlatform} name="Netflix">Netflix</button>
          <button onClick={this.togglePlatform} name="Amazon Prime">Amazon Prime</button>
          <button onClick={this.togglePlatform} name="Disney+">Disney+</button>
          <button onClick={this.togglePlatform} name="HBO Now">HBO Now</button>
          <button onClick={this.togglePlatform} name="Plex">Plex</button>
          <button onClick={this.togglePlatform} name="Other">Other</button>

          <h5>Selected Platforms: </h5>
          <ul>
          {
            this.state.platforms.map(eachPlatformn => {
              return <li>{eachPlatformn}</li>
            })
            }
          </ul>

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
