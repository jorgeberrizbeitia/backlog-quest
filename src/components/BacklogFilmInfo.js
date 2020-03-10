import React, { Component } from "react";
import axios from "axios";

export class BacklogFilmInfo extends Component {
  state = {
    selectedPlatform: "",
    toogleInfo: false
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.props.updatePlatformProp(id, value);
  };

  showAdditionalInfo = () => {
    let newToggleInfo;
    this.state.toogleInfo === false
      ? (newToggleInfo = true)
      : (newToggleInfo = false);
    this.setState({ toogleInfo: newToggleInfo });
  };

  render() {
    // DECOINSTRUCT ALL PROPS HERE
    return (
      <div>
        <button
          class="list-group-item list-group-item-action list-items"
          onClick={this.showAdditionalInfo}
        >
          {/* Magnificent ternary to add icon depending on media type */}
          {this.props.eachMediaProp.type === "Series" ? (
            <i class="fas fa-tv"></i>
          ) : this.props.eachMediaProp.type === "Film" ? (
            <i class="fas fa-film"></i>
          ) : this.props.eachMediaProp.type === "Game" ? (
            <i class="fas fa-gamepad"></i>
          ) : null}
          <b> {this.props.eachMediaProp.title}</b> in{" "}
          <b>{this.props.eachMediaProp.platform}</b>
        </button>
        <br />

        {/* TERNARY OPERATOR SHOULD SHOW THE DIV AS AN ADITIONAL COMPONENT */}
        {this.state.toogleInfo ? (
          <div>
            <div class="card mb-3 cardReact">
              <div class="no-gutters infoblocks">
                <div class="col-md-4">
                  <img
                    src={this.props.eachMediaProp.image}
                    class="card-img"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <p class="card-text">
                      <small class="text-muted">
                        <b>Release Date:</b>{" "}
                        {this.props.eachMediaProp.releaseDate}
                      </small>{" "}
                      <br />
                      <small class="text-muted">
                        <b>Description:</b>{" "}
                        {this.props.eachMediaProp.description}
                      </small>
                    </p>
                  </div>
                </div>
              </div>

              <label>Update Platform</label>
              <select
                id={this.props.eachMediaProp._id}
                onChange={this.handleChange}
                name="platforms"
                value={this.props.eachMediaProp.platform}
              >
                {/* To show subscriptions/platforms to choose from based only on user profile owned subscriptions/platforms */}
                {this.props.userProp.platforms.map(eachPlatform => {
                  return <option value={eachPlatform}>{eachPlatform}</option>;
                })}
              </select>

              <button
                type="button"
                class="btn btn-outline-danger info-btns"
                onClick={() =>
                  this.props.deleteMediaProp(this.props.eachMediaProp._id)
                }
              >
                delete
              </button>

              <button
                type="button"
                class="btn btn-outline-success info-btns"
                onClick={() =>
                  this.props.toggleDoneProp(
                    this.props.eachMediaProp._id,
                    this.props.eachMediaProp.done
                  )
                }
              >
                done
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default BacklogFilmInfo;
