import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import { Link } from "react-router-dom";
import BacklogMediaInfo from "../components/BacklogMediaInfo";

class Backlog extends Component {
  state = {
    media: [],
    filteredMedia: [], // media state mutated through filter by media type
    randomClick: false,
    previousFilteredMedia: [], // previous state for use in random button toggle off
    isLoading: true,
    filteredType: "", // set as none on the first load
    userPlatforms: [],
    userConsoles: []
  };

  // to get updated data from backend
  getAllBacklog = () => {
    // THIS SHOULD GO TO BACKEND SERVICES
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/backlog`,

        {
          withCredentials: true
        }
      )
      .then(apiResponse => {
        let firstFilteredArray = apiResponse.data.filter(
          e => e.type === this.state.filteredType
        ); // To show only films on first backlog load
        this.setState({
          media: apiResponse.data,
          filteredMedia: firstFilteredArray,
          previousFilteredMedia: firstFilteredArray,
          randomClick: false,
          isLoading: false
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
      randomClick: false,
      filteredType: event.target.name
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
        `${process.env.REACT_APP_API_URL}/api/media/${id}`,
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
      .delete(`${process.env.REACT_APP_API_URL}/api/media/${mediaId}`, {
        withCredentials: true
      })
      .then(() => this.getAllBacklog())
      .catch(err => console.log(err));
  };

  componentDidMount() {
    //  fetch the data from API befor initial render
    this.getAllBacklog();

    // THIS SHOULD GO TO BACKEND SERVICES USED ALSO ON PROFILE AND ADDFILM
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/profile/${this.props.user._id}`,

        {
          withCredentials: true
        }
      )
      .then(apiResponse => {
        this.setState({
          userPlatforms: apiResponse.data.platforms,
          userConsoles: apiResponse.data.consoles
        });
      });
  }

  toggleDone = (id, isItDone) => {
    // THIS SHOULD GO TO BACKEND SERVICES
    let done;
    isItDone ? (done = false) : (done = true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/media/${id}`,
        {
          done
        },
        {
          withCredentials: true
        }
      )
      .then(() => {
        this.getAllBacklog();
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      filteredMedia,
      isLoading,
      userPlatforms,
      userConsoles
    } = this.state;

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <button
            type="button"
            className="btn btn-info"
            onClick={this.filterMedia}
            name="Series"
          >
            <i className="fas fa-tv"></i> Series
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={this.filterMedia}
            name="Film"
          >
            <i className="fas fa-film"></i> Films
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={this.filterMedia}
            name="Game"
          >
            <i className="fas fa-gamepad"></i> Games
          </button>
        </nav>
        <div className="alert alert-info" role="alert">
          Backlog List
        </div>

        <div className="list-group">
          {!isLoading
            ? filteredMedia.map((eachMedia, i) => {
                return (
                  <BacklogMediaInfo key={"media"+i}
                    eachMediaProp={eachMedia}
                    userPlatformsProp={userPlatforms}
                    userConsolesProp={userConsoles}
                    updatePlatformProp={this.updatePlatform}
                    deleteMediaProp={this.deleteMedia}
                    toggleDoneProp={this.toggleDone}
                  />
                );
              })
            : null}
        </div>

        <nav className="navbar navbar-light bg-light footerbar">
          <Link className="btn btn-outline-info" type="button" to={"/add-media"}>
            <i className="fas fa-plus"></i>
          </Link>
          <button
            onClick={this.randomMedia}
            className="btn btn-info btn-circle btn-xl"
          >
            <i className="fas fa-random icon"></i>
          </button>

          <Link className="btn btn-outline-info" type="button" to={"/profile"}>
            <i className="fas fa-user"></i>
          </Link>
        </nav>
      </div>
    );
  }
}

export default withAuth(Backlog);
