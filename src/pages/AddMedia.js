import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import AddVideoInfo from "../components/AddVideoInfo";
import AddGameInfo from "../components/AddGameInfo";
import { Link } from "react-router-dom";

import { HowLongToBeatService, HowLongToBeatEntry } from "howlongtobeat";
let hltbService = new HowLongToBeatService();

export class AddMedia extends Component {
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

  test = () => {
    let name = "Nioh"
    hltbService.search(name).then(result => {
      let filteredResult = result.filter(game => game.name.toLowerCase() === name.toLowerCase())
      console.log(filteredResult[0])
    });
  } 

  handleFormSubmitForGames = event => {
    event.preventDefault();
    const { searchQuery } = this.state;
    
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


  handleFormSubmitForBooks = event => {
    event.preventDefault();
    const { searchQuery } = this.state;

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
          userPlatforms: apiResponse.data.platforms
        });
      });
  };

  render() {
    const {
      searchQuery,
      searchResults,
      searchType,
      userPlatforms
    } = this.state;

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <button
            type="button"
            className="btn btn-info"
            onClick={this.selectMediaType}
            name="Series"
          >
            <i className="fas fa-tv"></i> Series
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={this.selectMediaType}
            name="Film"
          >
            <i className="fas fa-film"></i> Films
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={this.selectMediaType}
            name="Game"
          >
            <i className="fas fa-gamepad"></i> Games
          </button>
        </nav>

        {searchType === "" ? (
          <div className="alert alert-warning" role="alert">
            <h3>Select a media type!</h3>
          </div>
        ) : (
          <form
            className="form-inline"
            onSubmit={
              searchType === "Game"
                ? this.handleFormSubmitForGames
                : this.handleFormSubmit
            }
          >
            <input
              className="form-control mr-sm-2 search-input"
              type="search"
              name="searchQuery"
              value={searchQuery}
              onChange={this.handleChange}
              placeholder={searchType}
            />
            <input
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              value="Search"
            />
          </form>
        )}

        <div className="list-group">
          <div className="column flex-column flex-nowrap">
            {/* ternary on map to show different components based on if it is film/series or games */}

            {searchType === "Game" &&
              searchResults.map((selectedResult, i) => {
                return (
                  <AddGameInfo
                    key={"game"+i}
                    selectedResultProp={selectedResult}
                    searchTypeProp={searchType}
                    userConsolesProp={userPlatforms}
                  />
                );
              })
            }

            {searchType === "Film" && 
              searchResults.map((selectedResult, i) => {
                return (
                  <AddVideoInfo
                    key={"media"+i}
                    selectedResultProp={selectedResult}
                    searchTypeProp={searchType}
                    userPlatformsProp={userPlatforms}
                  />
                );
              })
            }

          </div>
        </div>

        <nav className="navbar navbar-light bg-light footerbar">
          <Link className="btn btn-info btn-circle" to={"/backlog"}>
            <i className="fas fa-arrow-alt-circle-left"></i>
          </Link>
          <button onClick={this.test}>Test</button>
        </nav>
      </div>
    );
  }
}

export default withAuth(AddMedia);
