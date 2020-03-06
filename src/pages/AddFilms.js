import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import AddFilmInfo from "../components/AddFilmInfo";

export class AddFilms extends Component {
  state = {
    searchQuery: "",
    searchResults: []
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { searchQuery } = this.state;
    console.log(searchQuery)
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_CLIENT_KEY}&query=${searchQuery}&page=1`
      //   params: {
      //     api_key: process.env.CLIENT_KEY,
      //     query: searchQuery,
      //     page: 1
      //   }
    })
      .then(data => {
        console.log(data.data.results);
        this.setState({ searchResults: data.data.results });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { searchQuery, searchResults } = this.state;

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="searchQuery"
            value={searchQuery}
            onChange={this.handleChange}
          />
          <input type="submit" value="Search" />
          <div>
            <ul>
              {searchResults.map(selectedResult => {
                return (
                  <AddFilmInfo selectedResultProp={selectedResult}/>
                );
              })}
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(AddFilms);