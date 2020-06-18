import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // console.log(history);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // console.log(history);
    // console.log(current);
    // console.log(current.squares);
    // console.log(winner);

    const moves = history.map((step, move) => (
      <li key={move}>
        <button onClick={() => this.jumpTo(move)}>
          {move ? 'Go to move #' + move : 'Go to game start'}
        </button>
      </li>
    ));
    // console.log(moves);

    const status = winner
      ? 'Winner: ' + winner
      : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  // console.log(squares);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // console.log(lines.length);
  for (let i = 0; i < lines.length; i++) {
    // console.log(lines[i]);
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    // console.log(
    //   squares[a] && squares[a] === squares[b] && squares[a] === squares[c],
    // );
    // console.log(squares[a]);
  }
  // console.log(squares.filter(i => i === null).length ? null : 'draw');
  // console.log(squares.map(i => (i === null ? 'null' : 'draw')));
  return squares.filter(i => i === null).length ? null : 'draw';
}
