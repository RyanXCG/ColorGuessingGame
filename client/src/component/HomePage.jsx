import React, { Component } from "react";
import { Link } from "react-router-dom";
import ColorDotRoll from "./ColorDotRoll";

function getNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: [getNumber(6), getNumber(6), getNumber(6), getNumber(6)],
      rolls: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    };
  }

  render() {
    return (
      <div>
        <h2>Color Puzzle Pro</h2>

        <Link to="/gameRules">Game Rules</Link>
        <br></br>
        {this.state.rolls.map((roll) => {
          return (
            <ColorDotRoll key={roll} roll={roll} answer={this.state.answer} />
          );
        })}
      </div>
    );
  }
}

export default HomePage;
