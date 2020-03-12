import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedIn } = this.props;

    return (
      <nav class="navbar navbar-light bg-light">
        <Link to={"/"} class="btn btn-outline-info" type="button">
        <i class="fas fa-home"></i>
        </Link>
        {isLoggedIn ? (
          <>
            {/* <p id="home-btn">Welcome {user.username} </p> */}
            <Link
             class="btn btn-outline-info" type="button"
              to={"/backlog"}
            >
              <i class="fas fa-list"></i>
            </Link>
            <Link
              class="btn btn-outline-success" type="button"
              to={"/done"}
            >
              <i class="fas fa-tasks"></i>
            </Link>
            <i class="fas fa-sign-out-alt btn btn-outline-danger" type="button" onClick={logout}></i>
          </>
        ) : (
          <>
            <Link to="/login" class="btn btn-outline-success" type="button">
              {" "}
              <i class="fas fa-sign-in-alt"></i>
            </Link>
            <br />
            <Link to="/signup" class="btn btn-outline-info" type="button">
              {" "}
              <i class="fas fa-user-plus"></i>
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
