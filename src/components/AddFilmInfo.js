import React, { Component } from "react";
import axios from "axios";

export class AddFilmInfo extends Component {
  state = {
    selectedResult: this.props.selectedResultProp,
    selectedPlatform: "",
    selectedMediaType: this.props.searchTypeProp,
    availablePlatforms: this.props.userProp.platforms // passed from withAuth HOC through Backlog
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(value)
  };

  addResult = (event, media, ImageUrl) => {
    event.preventDefault();
    if (this.state.selectedMediaType === "Film") {
      // API FOR FILMS
      const { title, vote_average, overview, release_date } = media;
      // THIS SHOULD GO TO BACKEND API SERVICES
      axios
        .post(
          "http://localhost:5000/api/add",
          {
            title, // Different name for series
            type: this.state.selectedMediaType,
            done: false,
            platform: this.state.selectedPlatform,
            image: ImageUrl,
            ranking: vote_average,
            description: overview,
            releaseDate: release_date // Different name for series
          },
          { withCredentials: true }
        )
        .then(data => console.log("Film created:", data))
        .catch(err => console.log(err));
    } else if (this.state.selectedMediaType === "Series") {
      // API FOR SERIES
      const { name, vote_average, overview, first_air_date } = media;
      // THIS SHOULD GO TO BACKEND API SERVICES
      axios
        .post(
          "http://localhost:5000/api/add",
          {
            title: name,
            type: this.state.selectedMediaType,
            done: false,
            platform: this.state.selectedPlatform,
            image: ImageUrl,
            ranking: vote_average,
            description: overview,
            releaseDate: first_air_date
          },
          { withCredentials: true }
        )
        .then(data => console.log("Film created:", data))
        .catch(err => console.log(err));
    }
  };

  render() {
    const { selectedResult, selectedPlatform, availablePlatforms } = this.state;
    const ImageUrl =
      "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" +
      selectedResult.poster_path;
    return (
      <li>
        {selectedResult.title}
        <img src={ImageUrl} alt="poster"></img>

        <select
          id={selectedResult.title}
          name="selectedPlatform"
          placeholder="Select platform"
          value={selectedPlatform}
          onChange={this.handleChange}
        >

        {/* To show subscriptions/platforms to choose from based only on user profile owned subscriptions/platforms */}
        {availablePlatforms.map(eachPlatform => {
            return <option value={eachPlatform}>{eachPlatform}</option>;
          })}

        </select>

        <button
          onClick={event => this.addResult(event, selectedResult, ImageUrl)}
        >
          Add to Backlog
        </button>
      </li>
    );
  }
}

export default AddFilmInfo;
