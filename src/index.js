import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDo from './features/todo'

// Component with only Render method can be written as regular function
function Square(props) {
    return (
        <button className={props.className} onClick={props.onClick}>
          { props.value }
        </button>
      );
  }
  
class Board extends React.Component {

    renderSquare(i) {
      let className = this.props.winningCells && this.props.winningCells.includes(i) ? 'squareWin' : 'square';
      return (
        <Square
            value={ this.props.squares[i] }
            onClick={() => this.props.onClick(i)}
            className={className}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
      }
    }

    render() {
      const history = this.state.history;
      const current = history[history.length -1 ];
      const winner = calculateWinner(current.squares);
      let status;
      let winningCells;
      if (winner) {
        status = 'Winner: ' + winner;
        winningCells = getWinningCells(current.squares);
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winningCells={winningCells}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
          <div className="game-info">
            <ToDo />
          </div>
        </div>
      );
    }

    handleClick(i) {
      const history = this.state.history
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
      });
    }

  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root') || document.createElement('div') // for testing purposes
  );

  function calculateWinner(squares){
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
    for (let i = 0; i < lines.length; i++){
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  function getWinningCells(squares){
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
    for (let i = 0; i < lines.length; i++){
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return [a,b,c];
      }
    }
    return null;
  }

  // function isGameOver(squares){

  //   // Game is over if :
  //   //  there is a winner
  //   //  no winner but all cells are filled
  //   //  TODO: no winner, remaining cells available but winning is impossible (end early)

  //   if (calculateWinner(squares)) {
  //     return true;
  //   }
  //   for (let i = 0; i < squares.length; i++){
  //     const a = squares[i];
  //     if (a === null){ //There are available cells to play
  //       return false
  //     }
  //   }
  //   return true;
  // }
  
  export default Game;
 