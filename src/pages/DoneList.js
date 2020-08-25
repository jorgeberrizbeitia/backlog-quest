import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import { Link } from "react-router-dom";
import BacklogMediaInfo from "../components/BacklogMediaInfo";

class DoneList extends Component {
  state = {
    media: [],
    filteredMedia: [], // media state mutated through filter by media type
    isLoading: true,
    filteredType: "" // set as none on the first load
  };

  // to get updated data from backend
  getAllBacklog = () => {
    // THIS SHOULD GO TO BACKEND SERVICES
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/done`, {
        withCredentials: true
      })
      .then(apiResponse => {
        let firstFilteredArray = apiResponse.data.filter(
          e => e.type === this.state.filteredType
        ); // To show only films on first backlog load
        this.setState({
          media: apiResponse.data,
          filteredMedia: firstFilteredArray,
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
    const { filteredMedia, isLoading } = this.state;

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.filterMedia}
            name="Series"
          >
            <i className="fas fa-tv"></i> Series
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={this.filterMedia}
            name="Film"
          >
            <i className="fas fa-film"></i> Films
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={this.filterMedia}
            name="Game"
          >
            <i className="fas fa-gamepad"></i> Games
          </button>
        </nav>
        <div className="alert alert-success" role="alert">
          Done List
        </div>

        <div className="list-group">
          {!isLoading
            ? filteredMedia.map((eachMedia, i) => {
                return (
                  <BacklogMediaInfo key={"done"+i}
                    eachMediaProp={eachMedia}
                    deleteMediaProp={this.deleteMedia}
                    toggleDoneProp={this.toggleDone}
                  />
                );
              })
            : null}
        </div>
        <nav className="navbar navbar-light bg-light footerbar">
          <Link className="btn btn-success btn-circle" to={"/backlog"}>
            <i className="fas fa-arrow-alt-circle-left"></i>
          </Link>
        </nav>
      </div>
    );
  }
}

export default withAuth(DoneList);
