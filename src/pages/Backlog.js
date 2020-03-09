import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import { Link } from "react-router-dom";
import BacklogFilmInfo from "../components/BacklogFilmInfo";

class Backlog extends Component {
  state = {
    media: [],
    filteredMedia: [], // media state mutated through filter by media type
    randomClick: false,
    previousFilteredMedia: [] // previous state for use in random button toggle off
  };

  // to get updated data from backend
  getAllBacklog = () => {
    // THIS SHOULD GO TO BACKEND SERVICES
    axios
      .get(`http://localhost:5000/api/backlog`, { withCredentials: true })
      .then(apiResponse => {
        let firstFilteredArray = apiResponse.data.filter(e => e.type === "Film"); // To show only films on first backlog load
        this.setState({
          media: apiResponse.data,
          filteredMedia: firstFilteredArray,
          previousFilteredMedia: firstFilteredArray,
          randomClick: false
        });
      });
  };

  // to filter backlog list by media type (Films, Series and Games)
  filterMedia = event => {
    let initialState = [...this.state.media];
    let newState = initialState.filter(e => e.type === event.target.name);
    this.setState({
      filteredMedia: newState,
      previousFilteredMedia: newState,
      randomClick: false
    });
  };

  // to select a random media from list
  randomMedia = () => {
    if (this.state.randomClick === false) {
      let previousFilteredState = this.state.filteredMedia;
      let randomNumber = Math.floor(
        Math.random() * previousFilteredState.length
      );
      let newState = previousFilteredState.filter(
        element => element._id === previousFilteredState[randomNumber]._id
      );
      this.setState({ filteredMedia: newState, randomClick: true });
    } else if (this.state.randomClick === true) {
      this.setState({
        filteredMedia: this.state.previousFilteredMedia,
        randomClick: false
      });
    }
  };

  // to update the platform via dropdown onChange
  updatePlatform = (id, value) => {
    // THIS SHOULD GO TO BACKEND SERVICES
    axios
      .put(
        `http://localhost:5000/api/media/${id}`,
        {
          platform: value
        },
        {
          withCredentials: true
        }
      )
      .then(() => this.getAllBacklog())
      .catch(err => console.log(err));
  };

  // to delete element from database and refresh
  deleteMedia = mediaId => {
    // THIS SHOULD GO TO BACKEND SERVICES
    axios
      .delete(`http://localhost:5000/api/media/${mediaId}`, {
        withCredentials: true
      })
      .then(() => this.getAllBacklog())
      .catch(err => console.log(err));
  };

  componentDidMount() {
    //  fetch the data from API befor initial render
    this.getAllBacklog();
  }

  render() {
    const { filteredMedia } = this.state;
    return (
      <div>
        <div>
          <button onClick={this.filterMedia} name="Series">
            Series
          </button>
          <button onClick={this.filterMedia} name="Film">
            Films
          </button>
        </div>
        <h1>Backlog</h1>
        <ul>
          {filteredMedia.map(eachMedia => {
            return (
              <li>
                <b>{eachMedia.title}</b> in <b>{eachMedia.platform}</b>
                <button onClick={this.showInfo}></button>
                <BacklogFilmInfo
                  eachMediaProp={eachMedia}
                  userProp={this.props.user}
                  updatePlatformProp={this.updatePlatform}
                  deleteMediaProp={this.deleteMedia}
                />
              </li>
            );
          })}
        </ul>
        <Link to={"/add/films"}>
          <p>Add</p>
        </Link>
        <button onClick={this.randomMedia}>Random</button>
        <Link to={"/profile"}>
          <p>Profile</p>
        </Link>
      </div>
    );
  }
}

export default withAuth(Backlog);
