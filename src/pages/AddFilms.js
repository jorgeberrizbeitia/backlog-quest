import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import AddFilmInfo from "../components/AddFilmInfo";
import { Link } from "react-router-dom";

export class AddFilms extends Component {
  state = {
    searchQuery: "",
    searchResults: [],
    searchType: "" // to use different api url
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { searchQuery, searchType } = this.state;

    let apiMediaType = "";
    searchType === "Film" ? (apiMediaType = "movie") : (apiMediaType = "tv")

    this.setState({ searchResults: [] })

    // THIS SHOULD GO TO EXTERNAL API SERVICES
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/${apiMediaType}?api_key=${process.env.REACT_APP_CLIENT_KEY}&query=${searchQuery}&page=1`
    })
      .then(data => {
        console.log(data.data.results);
        this.setState({ searchResults: data.data.results });
      })
      .catch(err => console.log(err));
  };

  selectMediaType = event => {
    const { name } = event.target;
    this.setState({ searchResults: [], searchType: name });
  };

  render() {
    const { searchQuery, searchResults, searchType } = this.state;

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

        {searchType === "" ? null : (
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
          <ul>
            {searchResults.map(selectedResult => {
              return (
                <AddFilmInfo
                  selectedResultProp={selectedResult}
                  searchTypeProp={searchType}
                  userProp={this.props.user}
                />
              );
            })}
          </ul>
          <Link to={"/backlog"}>
            <h4>Back</h4>
          </Link>
        </div>
      </div>
    );
  }
}

export default withAuth(AddFilms);
