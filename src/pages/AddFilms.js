import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import AddFilmInfo from "../components/AddFilmInfo";
import { Link } from "react-router-dom";

export class AddFilms extends Component {
  state = {
    searchQuery: "",
    searchResults: [],
    searchType: "", // to use different api url
    userPlatforms: []
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { searchQuery, searchType } = this.state;

    let apiMediaType = "";
    searchType === "Film" ? (apiMediaType = "movie") : (apiMediaType = "tv");

    this.setState({ searchResults: [] });

    // THIS SHOULD GO TO EXTERNAL API SERVICES
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/${apiMediaType}?api_key=${process.env.REACT_APP_CLIENT_KEY}&query=${searchQuery}&page=1`
    })
      .then(data => {
        // to remove data without poster images because what are those anyway
        const newData = data.data.results.filter(e => e.poster_path !== undefined)
        this.setState({ searchResults: newData });
      })
      .catch(err => console.log(err));
  };

  selectMediaType = event => {
    const { name } = event.target;
    this.setState({ searchResults: [], searchType: name, searchQuery: "" });
  };

  componentDidMount = () => {
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
        userPlatforms: apiResponse.data.platforms
        // MISSING CONSOLES
      });
    });
  }

  render() {
    const { searchQuery, searchResults, searchType, userPlatforms } = this.state;

    return (
      <div>
        <div>
          <button onClick={this.selectMediaType} name="Series">
            Series
          </button>
          <button onClick={this.selectMediaType} name="Film">
            Films
          </button>
        </div>

        {searchType === "" ? (
          <h3>Select a media type!</h3>
        ) : (
          <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              name="searchQuery"
              value={searchQuery}
              onChange={this.handleChange}
              placeholder={searchType}
            />
            <input type="submit" value="Search" />
          </form>
        )}

        <div>
          <div class="column flex-column flex-nowrap">
            {searchResults.map(selectedResult => {
              return (
                <AddFilmInfo
                  selectedResultProp={selectedResult}
                  searchTypeProp={searchType}
                  userPlatformsProp={userPlatforms}
                />
              );
            })}
          </div>
        </div>
        <Link to={"/backlog"}>
          <h4>Back</h4>
        </Link>
      </div>
    );
  }
}

export default withAuth(AddFilms);
