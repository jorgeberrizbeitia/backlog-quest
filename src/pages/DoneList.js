import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import { Link } from "react-router-dom";
import DoneMediaInfo from "../components/DoneMediaInfo";

class DoneList extends Component {
  state = {
    media: [],
    filteredMedia: [], // media state mutated through filter by media type
    isLoading: true,
    filteredType: "Film" // set as film on the first load
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
        <div>
          <button onClick={this.filterMedia} name="Series">
            Series
          </button>
          <button onClick={this.filterMedia} name="Film">
            Films
          </button>
        </div>
        <h1>Done List</h1>
        <ul>
          {!isLoading
            ? filteredMedia.map(eachMedia => {
                return (
                  <li>
                    <DoneMediaInfo
                      eachMediaProp={eachMedia}
                      userProp={this.props.user}
                      deleteMediaProp={this.deleteMedia}
                      toggleDoneProp={this.toggleDone}
                    />
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    );
  }
}

export default withAuth(DoneList);
