import React, { Component } from "react";
import axios from "axios";

export class AddFilmInfo extends Component {
  state = {
    selectedResult: this.props.selectedResultProp,
    selectedPlatform: ""
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addResult = (event, media, ImageUrl) => {
    event.preventDefault();
    const { title, vote_average, overview, release_date } = media;

    axios
      .post(
        "http://localhost:5000/api/add",
        {
          title,
          type: "Film",
          done: false,
          platform: "Netflix",
          image: ImageUrl,
          ranking: vote_average,
          description: overview,
          releaseDate: release_date
        },
        { withCredentials: true }
      )
      .then(data => console.log("Film created:", data))
      .catch(err => console.log(err));
  };

  render() {
    const { selectedResult, selectedPlatform } = this.state;
    const ImageUrl = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + selectedResult.poster_path;
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
          <option value="Netflix">Netflix</option>
          <option value="Amazon Prime">Amazon Prime</option>
          <option value="Disney+">Disney+</option>
          <option value="HBO Now">HBO Now</option>
          <option value="Plex">Plex</option>
          <option value="Other">Other</option>
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
