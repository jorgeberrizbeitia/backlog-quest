import React, { Component } from "react";
import axios from "axios";

export class BacklogFilmInfo extends Component {
  state = {
    eachMedia: this.props.eachMediaProp, // passed from Backlog props
    availablePlatforms: this.props.userProp.platforms, // passed from withAuth HOC through Backlog
    selectedPlatform: ""
  };

  handleChange = event =>  {
    const { id, value } = event.target;
    this.props.updatePlatformProp(id, value)
    this.setState({ "eachMedia.platform": value })
    
  };

  render() {
    const { eachMedia, availablePlatforms } = this.state;
    return (
      <div>
        <select
          id={eachMedia._id}
          onChange={this.handleChange}
          name="platforms"
          // THIS NEEDS TO BE FIXED. SHOWING PREVIOUS SELECTED ITEM IN VALUE ON MEDIA UPDATE
          value={eachMedia.platform}
        >
        {/* To show subscriptions/platforms to choose from based only on user profile owned subscriptions/platforms */}
          {availablePlatforms.map(eachPlatform => {
            return <option value={eachPlatform}>{eachPlatform}</option>;
          })}

        </select>
        <button onClick={ () => this.props.deleteMediaProp(eachMedia._id) }>delete</button>
      </div>
    );
  }
}

export default BacklogFilmInfo;
