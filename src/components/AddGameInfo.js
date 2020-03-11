import React, { Component } from "react";
import axios from "axios";

export class AddGameInfo extends Component {
  state = {
    selectedResult: this.props.selectedResultProp,
    selectedConsole: "",
    selectedMediaType: this.props.searchTypeProp,
    availableConsoles: this.props.userConsolesProp
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addResult = (event, media, ImageUrl) => {
    event.preventDefault();

    // THIS SHOULD GO TO EXTERNAL API SERVICES

    // switch case to fix platform field format because this API is SspECiaL ¬¬
    let platformCorrected = "";

    switch (this.state.selectedResult.platform) {
      case "Switch":
        platformCorrected = "switch";
        break;
      case "WII":
        platformCorrected = "wii";
        break;
      case "WIIU":
        platformCorrected = "wii-u";
        break;
      case "GC":
        platformCorrected = "gamecube";
        break;
      case "N64":
        platformCorrected = "nintendo-64";
        break;
      case "3DS":
        platformCorrected = "3ds";
        break;
      case "DS":
        platformCorrected = "ds";
        break;
      case "PS4":
        platformCorrected = "playstation-4";
        break;
      case "PS3":
        platformCorrected = "playstation-3";
        break;
      case "PS2":
        platformCorrected = "playstation-2";
        break;
      case "PS":
        platformCorrected = "playstation";
        break;
      case "PSP":
        platformCorrected = "psp";
        break;
      case "VITA":
        platformCorrected = "playstation-vita";
        break;
      case "PC":
        platformCorrected = "pc";
        break;
      case "XONE":
        platformCorrected = "xbox-one";
        break;
      case "Xbox 360":
        platformCorrected = "xbox-360";
        break;
      case "Xbox":
        platformCorrected = "xbox";
        break;
    }

    axios({
      method: "GET",
      url: `https://chicken-coop.p.rapidapi.com/games/${this.state.selectedResult.title}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
        "x-rapidapi-key": "ebde97877cmsh57d04785db64b6cp1c30f0jsn986c5e407a9c"
      },
      params: {
        platform: `${platformCorrected}`
      }
    })
      .then(data => {
        // THIS SHOULD GO TO BACKEND API SERVICES
        const {
          title,
          image,
          score,
          description,
          releasedDate
        } = data.data.result;
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/add`,
            {
              title,
              type: this.state.selectedMediaType,
              // done: false,
              platform: this.state.selectedConsole
              // image,
              // ranking: score,
              // description
              // releaseDate: releasedDate
            },
            { withCredentials: true }
          )
          .then(data => console.log("Game created:", data))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { selectedResult, selectedConsole, availableConsoles } = this.state;
    return (
      <div class="col-3">
        {selectedResult.title}

        <select
          id={selectedResult.title}
          name="selectedConsole"
          value={selectedConsole}
          onChange={this.handleChange}
        >
          {/* below is a placeholder for dropdown */}
          <option value="" disabled selected>
            Select your option
          </option>
          {/* To show subscriptions/platforms to choose from based only on user profile owned subscriptions/platforms */}
          {availableConsoles.map(eachConsole => {
            return <option value={eachConsole}>{eachConsole}</option>;
          })}
        </select>

        <button
          class="btn btn-info"
          onClick={event => this.addResult(event, selectedResult)}
        >
          Add to Backlog
        </button>
      </div>
    );
  }
}

export default AddGameInfo;
