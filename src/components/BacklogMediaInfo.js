import React, { Component } from "react";
import axios from "axios";

export class BacklogMediaInfo extends Component {
  state = {
    selectedPlatform: "",
    toogleInfo: false
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.props.updatePlatformProp(id, value);
  };

  handleDeleteClick = (id) => {
    this.setState({ toogleInfo: false })
    this.props.deleteMediaProp(id)
  }

  handleDoneClick = (id, doneStatus) => {
    this.setState({ toogleInfo: false })
    this.props.toggleDoneProp(id, doneStatus)
  }

  showAdditionalInfo = () => {
    let newToggleInfo;
    this.state.toogleInfo === false
      ? (newToggleInfo = true)
      : (newToggleInfo = false);
    this.setState({ toogleInfo: newToggleInfo });
  };

  // Thank you Capu!
  formatDate = d => {
    let date = new Date(d);
    let dd = date.getDate(); 
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear(); 
    if(dd<10){dd='0'+dd} ;
    if(mm<10){mm='0'+mm};
    return d = dd+'/'+mm+'/'+yyyy;
  } 

componentWillUnmount() {
  this.setState({ toogleInfo: false} )
}

  render() {
    const {
      eachMediaProp,
      userPlatformsProp,
      userConsolesProp,
      toggleDoneProp
    } = this.props;
    return (
      <div>
        <button
          class="list-group-item list-group-item-action list-items"
          onClick={this.showAdditionalInfo}
        >
          {/* Magnificent ternary to add icon depending on media type */}
          {eachMediaProp.type === "Series" ? (
            <i class="fas fa-tv"></i>
          ) : eachMediaProp.type === "Film" ? (
            <i class="fas fa-film"></i>
          ) : eachMediaProp.type === "Game" ? (
            <i class="fas fa-gamepad"></i>
          ) : null}
          <b>
            {" "}
            {eachMediaProp.title.length < 20
              ? eachMediaProp.title
              : eachMediaProp.title.slice(0, 20) + "..."}{" "}
          </b>
          in
          <b> {eachMediaProp.platform}</b>
        </button>
        <br />

        {/* TERNARY OPERATOR SHOULD SHOW THE DIV AS AN ADITIONAL COMPONENT */}
        {this.state.toogleInfo ? (
          <div>
            <div class="card">
              <div class="add-info-container">
                <div>
                  <img src={eachMediaProp.image} class="card-img" alt="..." />
                </div>
                <div class="card-body">
                  <p class="card-text">
                    <b>title: </b>
                    {eachMediaProp.title}
                    <br />
                    <b>Release Date:</b> {this.formatDate(eachMediaProp.releaseDate)}
                    <br />
                    <b>Rating:</b> {eachMediaProp.ranking}
                    <br />
                    {
                    eachMediaProp.done ? 
                    <p><b>Finished Date:</b> { this.formatDate(eachMediaProp.updated_at) }</p>
                    : null
                    }

                  </p>
                </div>
              </div>

              <div class="add-info-container">
                <h5>Platform:</h5>

                {eachMediaProp.done ? (
                  <h5>{eachMediaProp.platform}</h5>
                ) : (
                  <select
                    type="button"
                    class="btn btn-outline-info info-btns platform-dropdown"
                    id={eachMediaProp._id}
                    onChange={this.handleChange}
                    name="platforms"
                    value={eachMediaProp.platform}
                  >
                    {/* To show subscriptions/platforms to choose from based only on user profile owned subscriptions/platforms */}
                    {eachMediaProp.type === "Game"
                      ? userConsolesProp.map(eachConsole => {
                          return (
                            <option value={eachConsole}>{eachConsole}</option>
                          );
                        })
                      : userPlatformsProp.map(eachPlatform => {
                          return (
                            <option value={eachPlatform}>{eachPlatform}</option>
                          );
                        })}
                  </select>
                )}
              </div>

              <button
                type="button"
                class="btn btn-outline-danger info-btns"
                onClick={() => this.handleDeleteClick(eachMediaProp._id)}
              >
                delete
              </button>

              <button
                type="button"
                class={ eachMediaProp.done ? "btn btn-outline-info info-btns" : "btn btn-outline-success info-btns" }
                onClick={() =>
                  this.handleDoneClick(eachMediaProp._id, eachMediaProp.done)
                }
              >
               { eachMediaProp.done ? "undo" : "done" }
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default BacklogMediaInfo;
