import React, { Component } from "react";
import { Stage, Layer, Circle } from "react-konva";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const colorPallet = [
  "red",
  "cyan",
  "green",
  "yellow",
  "purple",
  "blue",
  "gray",
];

const feedBackPallet = ["gray", "yellow", "green"];

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = (theme) => ({
  paper: {
    position: "absolute",
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
});

class ColorDotRoll extends Component {
  constructor(props) {
    super(props);
    // feedBack 0 grey, No match
    // feedBack 1 yellow, Match color
    // feedBack 2 Green, Match both color and position
    this.state = {
      answer: this.props.answer,
      guess: [6, 6, 6, 6],
      feedBack: [0, 0, 0, 0],
      isOpen: false,
      activeID: -1,
      choices: [0, 1, 2, 3, 4, 5],
      hight: this.props.roll * 20 + 20,
      win: false,
      showCheckAnswer: false,
      showFeedback: false,
    };
    console.log(this.state);
  }

  onCircleClicked = (id) => {
    //let newGuess = this.state.guess;
    //newGuess[id] = color;
    this.setState({
      isOpen: true,
      activeID: id,
    });
  };

  onColorClicked = (color) => {
    let newGuess = this.state.guess;
    newGuess[this.state.activeID] = color;
    //check if checkAnswer should be shown
    let count = 0;
    for (let i = 0; i < 4; ++i) {
      if (newGuess[i] !== 6) {
        count++;
      }
    }

    this.setState({
      guess: newGuess,
      isOpen: false,
      showCheckAnswer: count === 4 ? true : false,
    });
  };

  onCheckAnswerClicked = () => {
    let ans = [...this.state.answer];
    let gue = [...this.state.guess];
    // check how many perfect match
    // mark already matched element
    let perfectMatch = 0;
    for (let i = 0; i < 4; ++i) {
      if (ans[i] === gue[i]) {
        ans[i] = -1;
        gue[i] = -2;
        perfectMatch++;
      }
    }
    console.log("after perfect match", ans, gue);
    // check half match
    let halfMatch = 0;
    for (let i = 0; i < 4; ++i) {
      let idx = ans.indexOf(gue[i]);
      if (idx !== -1) {
        ans[idx] = -1;
        halfMatch++;
      }
    }
    console.log("matches", perfectMatch, halfMatch);
    let feedBack = [0, 0, 0, 0];
    for (let i = 0; i < perfectMatch; ++i) {
      feedBack[i] = 2;
    }
    for (let i = perfectMatch; i < perfectMatch + halfMatch; ++i) {
      feedBack[i] = 1;
    }
    this.setState({
      feedBack: feedBack,
      showCheckAnswer: false,
      showFeedback: true,
    });

    // check win state
    if (perfectMatch === 4) {
      this.setState({
        win: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleWinClose = () => {
    this.setState({
      win: false,
    });
  };

  onStartClicked = () => {
    window.location.reload(false);
  };

  render() {
    console.log(this.state.guess);
    const { classes } = this.props;
    return (
      <div>
        <Stage width={600} height={80}>
          <Layer>
            {this.state.guess.map((gu, idx) => {
              return (
                <Circle
                  onClick={() => this.onCircleClicked(idx)}
                  key={idx}
                  radius={20}
                  x={50 + idx * 50}
                  y={20}
                  fill={colorPallet[gu]}
                />
              );
            })}

            {this.state.showFeedback &&
              this.state.feedBack.map((fb, idx) => {
                return (
                  <Circle
                    key={idx}
                    radius={10}
                    x={300 + idx * 30}
                    y={20}
                    fill={feedBackPallet[fb]}
                  />
                );
              })}
          </Layer>
        </Stage>
        <Modal open={this.state.isOpen} onClose={this.handleClose}>
          <div
            className={classes.paper}
            style={{
              top: `${15}%`,
              left: `${15}%`,
              transform: `translate(-${15}%, -${15}%)`,
            }}
          >
            <Stage width={250} height={36}>
              <Layer>
                {this.state.choices.map((choice) => {
                  return (
                    <Circle
                      onClick={() => this.onColorClicked(choice)}
                      key={choice}
                      radius={15}
                      x={20 + choice * 35}
                      y={18}
                      fill={colorPallet[choice]}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </Modal>
        {this.state.showCheckAnswer && (
          <button onClick={() => this.onCheckAnswerClicked()}>
            Check Answer
          </button>
        )}
        <Modal open={this.state.win} onClose={this.handleWinClose}>
          <div
            className={classes.paper}
            style={{
              top: `${50}%`,
              left: `${50}%`,
              transform: `translate(-${50}%, -${50}%)`,
            }}
          >
            You Win
            <button onClick={this.onStartClicked}>Start A New Round</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(ColorDotRoll);
