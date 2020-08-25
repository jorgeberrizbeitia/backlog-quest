import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import PlatformButton from "../components/PlatformButton";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    // email: "", // not used atm
    allPlatforms: {
      tv: [
        "Netflix",
        "Amazon Prime",
        "Disney+",
        "HBO Now",
        "Plex",
      ],
      game: [
        "Xbox",
        "Playstation",
        "Switch",
        "PC",
        "Mobile",
      ],
      book: [
        "Kindle Unlimited",
        "Scribd",
        "Bookmate",
        "24symbols",
        "Playster",
      ],
      comic: [
        "Comixology",
        "Marvel Unlimited",
        "DC Universe",
        "Crunchyroll",
        "Shonen Jump",
      ]
    },
    selectedPlatforms: {
      tv: ["Other"],
      game: ["Other"],
      book: ["Other"],
      comic: ["Other"],
    },
    errorMessage: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      password,
      selectedPlatforms
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

  togglePlatform = (event, platformName, platformType) => {
    event.preventDefault();

    let newPlatforms = this.state.selectedPlatforms; // variable to reduce syntax of code

    // Dynamically target platforms based on type to update selectedPlatform state
    if (newPlatforms[platformType].includes(platformName) ) {
      newPlatforms[platformType].splice(newPlatforms[platformType].indexOf(platformName), 1);
    } else {
      newPlatforms[platformType].push(platformName);
    }

    this.setState({ selectedPlatforms: newPlatforms });
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
              {allPlatforms.tv.map((eachPlatform, i) => (
                <PlatformButton
                  key={"platform" + i}
                  eachPlatform={eachPlatform}
                  selectedPlatforms={selectedPlatforms.tv}
                  platformType={"tv"}
                  togglePlatform={this.togglePlatform}
                />
              ))}
            </div>
            <div className="btn-group-vertical platforms-list">
              <h5>Video Games</h5>
              {allPlatforms.game.map((eachPlatform, i) => (
                <PlatformButton
                  key={"platform" + i}
                  eachPlatform={eachPlatform}
                  selectedPlatforms={selectedPlatforms.game}
                  platformType={"game"}
                  togglePlatform={this.togglePlatform}
                />
              ))}
            </div>
          </div>
          <br />
          <div className="platform-container">
            <div className="btn-group-vertical platforms-list">
              <h5>Books</h5>
              {allPlatforms.book.map((eachPlatform, i) => (
                <PlatformButton
                  key={"platform" + i}
                  eachPlatform={eachPlatform}
                  selectedPlatforms={selectedPlatforms.book}
                  platformType={"book"}
                  togglePlatform={this.togglePlatform}
                />
              ))}
            </div>
            <div className="btn-group-vertical platforms-list">
              <h5>Comics</h5>
              {allPlatforms.comic.map((eachPlatform, i) => (
                <PlatformButton
                  key={"platform" + i}
                  eachPlatform={eachPlatform}
                  selectedPlatforms={selectedPlatforms.comic}
                  platformType={"comic"}
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
