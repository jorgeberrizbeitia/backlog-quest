import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import { Link } from "react-router-dom";

class Backlog extends Component {
  state = {
    media: [],
    filteredMedia: [],
    randomClick: false,
    previousFilteredMedia: [] // prev state
  };

  getAllBacklog = () => {
    axios
      .get(`http://localhost:5000/api/backlog`, { withCredentials: true })
      .then(apiResponse => {
        this.setState({
          media: apiResponse.data,
          filteredMedia: apiResponse.data,
          previousFilteredMedia: apiResponse.data,
          randomClick: false
        });
      });
  };

  componentDidMount() {
    //  fetch the data from API befor initial render
    this.getAllBacklog();
  }

  filterMedia = event => {
    let initialState = [...this.state.media];
    let newState = initialState.filter(e => e.type === event.target.name);
    this.setState({
      filteredMedia: newState,
      previousFilteredMedia: newState,
      randomClick: false
    });
  };

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

  deleteMedia = (event, media) => {
    event.preventDefault();
    console.log(media);
    axios
      .delete(`http://localhost:5000/api/media/${media._id}`, {
        withCredentials: true
      })
      .then(() => this.getAllBacklog())
      .catch(err => console.log(err));
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.updatePlatform(id, value);
  };

  updatePlatform = (id, value) => {

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
          {filteredMedia.map(media => {
            return (
              <li>
                <b>{media.title}</b> in <b>{media.platform}</b>
                <div>
                  {/* This will be a component called from title button above */}
                  <select
                    id={media._id}
                    onChange={this.handleChange}
                    name="platforms"
                    value={media.platform}
                  >
                    <option value="Netflix">Netflix</option>
                    <option value="Amazon Prime">Amazon Prime</option>
                    <option value="Disney+">Disney+</option>
                    <option value="HBO Now">HBO Now</option>
                    <option value="Plex">Plex</option>
                    <option value="Other">Other</option>
                  </select>
                  <button onClick={event => this.deleteMedia(event, media)}>
                    delete
                  </button>
                </div>
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
