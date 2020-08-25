import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

class Navbar extends Component {
  render() {
    const { logout, isLoggedIn } = this.props;

    return (
      <nav className="navbar navbar-light bg-light">
        <Link to={"/"} className="btn btn-outline-info" type="button">
        <i className="fas fa-home"></i>
        </Link>
        {isLoggedIn ? (
          <>
            {/* <p id="home-btn">Welcome {user.username} </p> */}
            <Link
             className="btn btn-outline-info" type="button"
              to={"/backlog"}
            >
              <i className="fas fa-list"></i>
            </Link>
            <Link
              className="btn btn-outline-success" type="button"
              to={"/done"}
            >
              <i className="fas fa-tasks"></i>
            </Link>
            <i className="fas fa-sign-out-alt btn btn-outline-danger" type="button" onClick={logout}></i>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-success" type="button">
              {" "}
              <i className="fas fa-sign-in-alt"></i>
            </Link>
            <br />
            <Link to="/signup" className="btn btn-outline-info" type="button">
              {" "}
              <i className="fas fa-user-plus"></i>
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
