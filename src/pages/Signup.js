import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import PlatformButton from "../components/PlatformButton";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    // email: "", // not used atm
    allPlatforms: [
      "Netflix",
      "Amazon Prime",
      "Disney+",
      "HBO Now",
      "Plex",
      "Xbox",
      "Playstation",
      "Switch",
      "PC",
      "Mobile",
      "Kindle Unlimited",
      "Scribd",
      "Bookmate",
      "24symbols",
      "Playster",
      "Comixology",
      "Marvel Unlimited",
      "DC Universe",
      "Crunchyroll",
      "Shonen Jump",
    ],
    selectedPlatforms: [],
    // allConsoles: ["Xbox", "Playstation", "Switch", "PC", "Other"],
    // selectedConsoles: [],
    errorMessage: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      password,
      selectedPlatforms,
      // selectedConsoles,
    } = this.state;

    this.props
      .signup(username, password, selectedPlatforms)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err)
        // FIX TO CHANGE DEPENDING ON ERROR MESSAGE
        this.setState({ errorMessage: "Username already taken" });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  togglePlatform = (event) => {
    event.preventDefault();

    const { name } = event.target;
    // const { name, className } = event.target;
    let newPlatforms = this.state.selectedPlatforms;
    // let newConsoles = this.state.selectedConsoles;

    if (newPlatforms.includes(name)) {
      newPlatforms.splice(newPlatforms.indexOf(name), 1);
    } else {
      newPlatforms.push(name);
    }
    this.setState({ selectedPlatforms: newPlatforms });

    // if (className.includes("platformBtn")) {
    //   if (newPlatforms.includes(name)) {
    //     newPlatforms.splice(newPlatforms.indexOf(name), 1);
    //   } else {
    //     newPlatforms.push(name);
    //   }
    //   this.setState({ selectedPlatforms: newPlatforms });
    // } else if (className.includes("consoleBtn")) {
    //   if (newConsoles.includes(name)) {
    //     newConsoles.splice(newConsoles.indexOf(name), 1);
    //   } else {
    //     newConsoles.push(name);
    //   }
    //   this.setState({ selectedConsoles: newConsoles });
    // }
  };

  render() {
    const {
      username,
      password,
      allPlatforms,
      selectedPlatforms,
      errorMessage,
    } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

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
            <span>{errorMessage}</span>
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

          <p>Select your owned subscriptions and consoles below!</p>

          {/* Here you can observe magic happening by mapping on arrays and hard-coding style based on .includes */}

          <div className="platform-container">
            <div className="btn-group-vertical platforms-list">
              <h5>Films & Series</h5>
              {allPlatforms.slice(0, 5).map((eachPlatform, i) => (
                <PlatformButton
                  key={"platform" + i}
                  eachPlatform={eachPlatform}
                  selectedPlatforms={selectedPlatforms}
                  togglePlatform={this.togglePlatform}
                />
              ))}
            </div>
            <div className="btn-group-vertical platforms-list">
              <h5>Video Games</h5>
              {allPlatforms.slice(5, 10).map((eachPlatform, i) => (
                <PlatformButton
                  key={"platform" + i}
                  eachPlatform={eachPlatform}
                  selectedPlatforms={selectedPlatforms}
                  togglePlatform={this.togglePlatform}
                />
              ))}
            </div>
          </div>
          <br />
          <div className="platform-container">
            <div className="btn-group-vertical platforms-list">
              <h5>Books</h5>
              {allPlatforms.slice(10, 15).map((eachPlatform, i) => (
                <PlatformButton
                  key={"platform" + i}
                  eachPlatform={eachPlatform}
                  selectedPlatforms={selectedPlatforms}
                  togglePlatform={this.togglePlatform}
                />
              ))}
            </div>
            <div className="btn-group-vertical platforms-list">
              <h5>Comics</h5>
              {allPlatforms.slice(15, 20).map((eachPlatform, i) => (
                <PlatformButton
                  key={"platform" + i}
                  eachPlatform={eachPlatform}
                  selectedPlatforms={selectedPlatforms}
                  togglePlatform={this.togglePlatform}
                />
              ))}
            </div>
          </div>

          <p>Don't worry, you will be able to edit this later</p>

          <div className="sign-btn">
            <input className="btn btn-primary" type="submit" value="Signup" />
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Signup);
