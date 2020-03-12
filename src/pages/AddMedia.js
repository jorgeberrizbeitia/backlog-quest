import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import AddVideoInfo from "../components/AddVideoInfo";
import AddGameInfo from "../components/AddGameInfo";
import { Link } from "react-router-dom";

// import { HowLongToBeatService, HowLongToBeatEntry } from "howlongtobeat";
// let hltbService = new HowLongToBeatService();

export class AddMedia extends Component {
  state = {
    searchQuery: "",
    searchResults: [],
    searchType: "", // to use different api url
    userPlatforms: [],
    userConsoles: []
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmitForGames = event => {
    event.preventDefault();
    const { searchQuery } = this.state;

    // hltbService.search("Nioh").then(result => console.log(result));

    axios({
      method: "GET",
      url: "https://chicken-coop.p.rapidapi.com/games",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_GAMES_CLIENT_KEY // NEED TO CHANGE THIS TO .ENV API KEY
      },
      params: {
        title: `${searchQuery}`
      }
    })
      .then(data => {
        // to remove data without images because who needs those anyway
        const newData = data.data.result.filter(
          e => e.image !== null
        );
        this.setState({ searchResults: newData });
      })
      .catch(err => console.log(err));

    this.setState({ searchResults: [] });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { searchQuery, searchType } = this.state;

    // variable to re-use films/series api axios
    let apiMediaType = "";
    searchType === "Film" ? (apiMediaType = "movie") : (apiMediaType = "tv");
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/${apiMediaType}?api_key=${process.env.REACT_APP_CLIENT_KEY}&query=${searchQuery}&page=1`
    })
      .then(data => {
        // to remove data without images because who wants those anyway
        const newData = data.data.results.filter(
          e => e.poster_path !== null
        );
        this.setState({ searchResults: newData });
      })
      .catch(err => console.log(err));

    this.setState({ searchResults: [] });
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
          userPlatforms: apiResponse.data.platforms,
          userConsoles: apiResponse.data.consoles
        });
      });
  };

  render() {
    const {
      searchQuery,
      searchResults,
      searchType,
      userPlatforms,
      userConsoles
    } = this.state;

    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <button
            type="button"
            class="btn btn-info"
            onClick={this.selectMediaType}
            name="Series"
          >
            <i class="fas fa-tv"></i> Series
          </button>

          <button
            type="button"
            class="btn btn-info"
            onClick={this.selectMediaType}
            name="Film"
          >
            <i class="fas fa-film"></i> Films
          </button>

          <button
            type="button"
            class="btn btn-info"
            onClick={this.selectMediaType}
            name="Game"
          >
            <i class="fas fa-gamepad"></i> Games
          </button>
        </nav>

        {searchType === "" ? (
          <div class="alert alert-warning" role="alert">
            <h3>Select a media type!</h3>
          </div>
        ) : (
          <form
            class="form-inline"
            onSubmit={
              searchType === "Game"
                ? this.handleFormSubmitForGames
                : this.handleFormSubmit
            }
          >
            <input
              class="form-control mr-sm-2 search-input"
              type="search"
              name="searchQuery"
              value={searchQuery}
              onChange={this.handleChange}
              placeholder={searchType}
            />
            <input
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              value="Search"
            />
          </form>
        )}

        <div class="list-group">
          <div class="column flex-column flex-nowrap">
            {/* ternary on map to show different components based on if it is film/series or games */}

            {searchType === "Game"
              ? searchResults.map(selectedResult => {
                  return (
                    <AddGameInfo
                      selectedResultProp={selectedResult}
                      searchTypeProp={searchType}
                      userConsolesProp={userConsoles}
                    />
                  );
                })
              : searchResults.map(selectedResult => {
                  return (
                    <AddVideoInfo
                      selectedResultProp={selectedResult}
                      searchTypeProp={searchType}
                      userPlatformsProp={userPlatforms}
                    />
                  );
                })}
          </div>
        </div>

        <nav class="navbar navbar-light bg-light footerbar">
          <Link class="btn btn-info btn-circle" to={"/backlog"}>
            <i class="fas fa-arrow-alt-circle-left"></i>
          </Link>
        </nav>
      </div>
    );
  }
}

export default withAuth(AddMedia);
