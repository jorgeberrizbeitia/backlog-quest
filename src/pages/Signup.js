import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "", // not used atm
    allPlatforms: [
      "Netflix",
      "Amazon Prime",
      "Disney+",
      "HBO Now",
      "Plex",
      "Other",
    ],
    selectedPlatforms: [],
    allConsoles: ["Xbox", "Playstation", "Switch", "PC", "Other"],
    selectedConsoles: [],
    errorMessage: ""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      password,
      selectedPlatforms,
      selectedConsoles,
    } = this.state;

    this.props.signup(username, password, selectedPlatforms, selectedConsoles)
     .then(res => console.log(res))
     .catch(err => {
       // FIX TO CHANGE DEPENDING ON ERROR MESSAGE
       this.setState({errorMessage: "Username already taken"})
     });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  togglePlatform = (event) => {
    event.preventDefault();

    const { name, id } = event.target;
    let newPlatforms = this.state.selectedPlatforms;
    let newConsoles = this.state.selectedConsoles;

    if (id === "platforms") {
      if (newPlatforms.includes(name)) {
        newPlatforms.splice(newPlatforms.indexOf(name), 1);
      } else {
        newPlatforms.push(name);
      }
      this.setState({ selectedPlatforms: newPlatforms });
    } else if (id === "consoles") {
      if (newConsoles.includes(name)) {
        newConsoles.splice(newConsoles.indexOf(name), 1);
      } else {
        newConsoles.push(name);
      }
      this.setState({ selectedConsoles: newConsoles });
    }
  };

  render() {
    const {
      username,
      password,
      allPlatforms,
      selectedPlatforms,
      allConsoles,
      selectedConsoles,
      errorMessage
    } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>
          <div class="form-group">
            <label>Username:</label>
            <input
              class="form-control"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="Your name here"
            />
          <span>{errorMessage}</span>
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input
              class="form-control"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="And your password here"
            />
          </div>

          <p>Select your owned subscriptions and consoles below!</p>

          {/* Here you can observe magic happening by mapping on arrays and hard-coding style based on .includes */}

          <div class="platform-container">
            <div class="btn-group-vertical platforms-list">
              {allPlatforms.map((eachPlatform) => {
                return (
                  <button
                    id="platforms"
                    class={
                      selectedPlatforms.includes(eachPlatform)
                        ? "btn btn-info"
                        : "btn btn-secondary"
                    }
                    onClick={this.togglePlatform}
                    name={eachPlatform}
                  >
                    {eachPlatform}
                  </button>
                );
              })}
            </div>

            <div class="btn-group-vertical platforms-list">
              {allConsoles.map((eachConsole) => {
                return (
                  <button
                    id="consoles"
                    class={
                      selectedConsoles.includes(eachConsole)
                        ? "btn btn-info"
                        : "btn btn-secondary"
                    }
                    onClick={this.togglePlatform}
                    name={eachConsole}
                  >
                    {eachConsole}
                  </button>
                );
              })}
            </div>
          </div>

          <p>Don't worry, you will be able to edit this later</p>

          {/* <label>Selected Platforms: </label>
            <ul>
              {this.state.selectedPlatforms.map(eachPlatform => {
                return <li>{eachPlatform}</li>;
              })}
            </ul> */}

          <div class="sign-btn">
            <input class="btn btn-primary" type="submit" value="Signup" />
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Signup);
