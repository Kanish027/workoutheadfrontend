import React from "react";
import { Link } from "react-router-dom";
import WorkoutForm from "./WorkoutForm";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Workout <span style={{ color: '#0072ff' }}>Head</span></h2>
        </Link>
          <WorkoutForm/>
      </div>
    </header>
  );
};

export default Navbar;
