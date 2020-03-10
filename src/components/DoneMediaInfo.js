import React, { Component } from "react";
import axios from "axios";

export class DoneMediaInfo extends Component {
  state = {
    selectedPlatform: "",
    toogleInfo: false
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.props.updatePlatformProp(id, value);
  };

  showAdditionalInfo = () => {
    console.log("showInfo working");
    let newToggleInfo;
    this.state.toogleInfo === false
      ? (newToggleInfo = true)
      : (newToggleInfo = false);
    this.setState({ toogleInfo: newToggleInfo });
  };

  render() {
    console.log()
    // DECOINSTRUCT ALL PROPS HERE
    return (
      <div>
        <button onClick={this.showAdditionalInfo}>
          <b>{this.props.eachMediaProp.title}</b> in{" "}
          <b>{this.props.eachMediaProp.platform}</b>
        </button>
        <br />

        {/* TERNARY OPERATOR SHOULD SHOW THE DIV AS AN ADITIONAL COMPONENT */}
        {this.state.toogleInfo ? (
          <div>
            <div>
              <img src={this.props.eachMediaProp.image} alt="poster"></img>
              <div>
                <p>Release Date: {this.props.eachMediaProp.releaseDate}</p>
                <p>ranking: {this.props.eachMediaProp.ranking}</p>
                <p>Description: {this.props.eachMediaProp.description}</p>
              </div>
            </div>

            <p>Platform viewed: {this.props.eachMediaProp.platform}</p>
            <p>Finished Date: {this.props.eachMediaProp.updated_at}</p>
            
            <button type="button" class="btn btn-outline-danger"
              onClick={() =>
                this.props.deleteMediaProp(this.props.eachMediaProp._id)
              }
            >
              delete
            </button>


            <button type="button" class="btn btn-outline-warning"
              onClick={() =>
                this.props.toggleDoneProp(
                  this.props.eachMediaProp._id,
                  this.props.eachMediaProp.done
                )
              }
            >
              undo
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DoneMediaInfo;
