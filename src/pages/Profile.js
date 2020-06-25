import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import axios from "axios";

class Profile extends Component {
  state = {
    username: "",
    password: "", // not used here atm
    email: "", // not used atm
    allPlatforms: [
      "Netflix",
      "Amazon Prime",
      "Disney+",
      "HBO Now",
      "Plex",
      "Other"
    ],
    selectedPlatforms: [],
    allConsoles: ["Xbox", "Playstation", "Switch", "PC", "Other"],
    selectedConsoles: []
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { selectedPlatforms, selectedConsoles } = this.state;

    // use put route here
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/profile/${this.props.user._id}`,
        {
          platforms: selectedPlatforms,
          consoles: selectedConsoles
        },
        {
          withCredentials: true
        }
      )
      .then(() => console.log("User platforms updated"))
      .catch(err => console.log(err));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  togglePlatform = event => {
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
        this.setState({
          username: apiResponse.data.username,
          selectedPlatforms: apiResponse.data.platforms,
          selectedConsoles: apiResponse.data.consoles
        });
      });
  };

  render() {
    const {
      username,
      allPlatforms,
      selectedPlatforms,
      allConsoles,
      selectedConsoles
    } = this.state;
    return (
      <div>
        <h4>Welcome to your profile {username}</h4>
        <form onSubmit={this.handleFormSubmit}>
          <p>Update your subscriptions and consoles below!</p>

          {/* Here you can observe magic happening by mapping on arrays and hard-coding style based on .includes */}

          <div class="platform-container">
            <div class="btn-group-vertical platforms-list">
              {allPlatforms.map(eachPlatform => {
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
              {allConsoles.map(eachConsole => {
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

          <p>You can edit this anytime you want!</p>

          {/* <label>Selected Platforms: </label>
            <ul>
              {this.state.selectedPlatforms.map(eachPlatform => {
                return <li>{eachPlatform}</li>;
              })}
            </ul> */}

          <div class="sign-btn">
            <input class="btn btn-primary" type="submit" value="Update" />
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Profile);
