import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import { Link } from "react-router-dom";

class Backlog extends Component {
  state = {
    media: [],
    filteredMedia: [],
    randomClick: false,
    previousFilteredMedia: []
  };

  getAllBacklog = () => {
    axios.get(`http://localhost:5000/api/backlog`).then(apiResponse => {
      this.setState({ media: apiResponse.data });
    });
  };

  componentDidMount() {
    //  fetch the data from API befor initial render
    this.getAllBacklog();
  }

  filterMedia = event => {
    let previousState = [...this.state.media];
    let newState = previousState.filter(e => e.type === event.target.name);
    this.setState({ filteredMedia: newState, previousFilteredMedia: newState });
  };

  randomMedia = () => {
    if (this.state.randomClick === false) {
      let previousState = this.state.filteredMedia;
      let randomNumber = Math.floor(Math.random() * previousState.length);
      let newState = previousState.filter(
        element => element._id === previousState[randomNumber]._id
      );
      this.setState({ filteredMedia: newState, randomClick: true } );
    } else if (this.state.randomClick === true) {
      this.setState({filteredMedia: this.state.previousFilteredMedia, randomClick: false })
    }
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
          {filteredMedia.map(e => {
            return <li>{e.title}</li>;
          })}
        </ul>
        <Link to={"/Search"}>
          <p>Add</p>
        </Link>
        <button onClick={this.randomMedia}>Random</button>
        <Link to={"/Profile"}>
          <p>Profile</p>
        </Link>
      </div>
    );
  }
}

export default withAuth(Backlog);
