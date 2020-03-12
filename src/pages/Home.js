import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homeContainer">
      <img src="images/logoTransp.png" alt="logo2" width="100%"/> 
      <Link to="/backlog" type="button" class="btn btn-info btn-lg btn-block">Click Here to Start!</Link>
    </div>
  );
}

export default Home;
