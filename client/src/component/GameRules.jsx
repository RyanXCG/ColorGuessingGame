import React, { Component } from "react";
import { Link } from "react-router-dom";

class GameRules extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Game Rules</h2>
        <p>
          Choose four colors in the next available row and them click on the
          Check button. The Computer will score your guess in the following way:
        </p>
        <p>
          For each guess that is right in both color and position you get a
          black point
        </p>
        <p>
          For each guess that is right in color but not in position you get a
          red point
        </p>
        <Link to="/">Go Back</Link>
      </div>
    );
  }
}

export default GameRules;
