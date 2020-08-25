import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import axios from "axios";
import PlatformButton from "../components/PlatformButton";


class Profile extends Component {
  state = {
    username: "",
    password: "", // not used here atm
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
    acceptedMessage: ""
  };

  componentDidMount = () => {
    // THIS SHOULD GO TO BACKEND SERVICES
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/profile/${this.props.user._id}`,

        {
          withCredentials: true
        }
      )
      .then(apiResponse => {
        console.log(apiResponse.data.platforms)
        this.setState({
          username: apiResponse.data.username,
          selectedPlatforms: apiResponse.data.platforms
        });
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/profile/${this.props.user._id}`,
        {
          platforms: this.state.selectedPlatforms
        },
        {
          withCredentials: true
        }
      )
      .then(() => this.setState({acceptedMessage: "Platforms updated!"}))
      .catch(err => console.log(err));
  };

  handleChange = event => {
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
      allPlatforms,
      selectedPlatforms,
      acceptedMessage
    } = this.state;
    return (
      <div>
        <h4>Welcome to your profile {username}</h4>
        <form onSubmit={this.handleFormSubmit}>
          <p>Update your subscriptions and consoles below!</p>

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

          <p>You can edit this anytime you want!</p>

          <div className="sign-btn">
            <input className="btn btn-primary" type="submit" value="Update" />
          </div>
          {acceptedMessage && <h5>{acceptedMessage}</h5>}
        </form>
      </div>
    );
  }
}

export default withAuth(Profile);
