
import { useEffect, useState } from 'react';
import update from 'immutability-helper';
import './App.css';

const BoardSize = 3;
const LocalStorageGameKey = "ml-tic-tac-toe";

const GameStatus = {
  Playing: 1,
  GameOver: 2,
  Draw: 3,
}

const Player = {
  None: "",
  O: "O",
  X: "X",
}

const emptyBoard = [["", "", ""], ["", "", ""], ["", "", ""]];

function App() {
  const [board, setBoard] = useState(emptyBoard)
  const [gameStatus, setGameStatus] = useState(GameStatus.Playing)
  const [turn, setTurn] = useState(Player.X)
  const [turnCount, setTurnCount] = useState(0)

  useEffect(()=>{
    // get state on first load
    const storage = JSON.parse(localStorage.getItem(LocalStorageGameKey))
    if (storage !== null){
      setBoard(storage.board)
      setGameStatus(storage.gameStatus)
      setTurn(storage.turn)
      setTurnCount(storage.turnCount)
    }
  },[])

  useEffect(() => {
    if (turnCount > 0){
      checkWinCondition();
    }
  }, [board, turnCount])

  useEffect(() => {
    // store state in localStorage
    localStorage.setItem(LocalStorageGameKey, JSON.stringify({board,gameStatus,turn,turnCount}));
  },[turnCount])

  const switchTurns = () => {
    setTurn(turn === Player.X ? Player.O : Player.X)
  }

  const checkWinCondition = () => {
    if (checkWinLine()) {
      setGameStatus(GameStatus.GameOver)
    } else if(turnCount === 9){
      setGameStatus(GameStatus.Draw)
    } else {
      switchTurns();
    }
  }

  const checkWinLine = () => {
    for (let i = 0; i < BoardSize; i++) {
      // check horizontal lines
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== Player.None) {
        return true;
      }
      // check vertical lines
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== Player.None) {
        return true;
      }
    }
    // check diagonal left to right
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== Player.None) {
      return true;
    }
    // check diagonal right to left
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== Player.None) {
      return true;
    }
    return false;
  }

  const handleReset = () => {
    setBoard(emptyBoard.slice())
    setGameStatus(GameStatus.Playing)
    setTurn(Player.X)
    setTurnCount(0)
  }

  const handleMove = (row, col) => {
    if (gameStatus === GameStatus.Playing && board[row][col] === Player.None) {
      setBoard(update(board, { [row]: { [col]: { $set: turn } } }))
      setTurnCount(turnCount+1)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">Michael's Tic-Tac-Toe</div>
        <GameBoard gameStatus={gameStatus} turn={turn} onMove={handleMove} board={board}></GameBoard>
        <TurnMarker gameStatus={gameStatus} turn={turn}></TurnMarker>
        <ResetButton onClick={handleReset} gameStatus={gameStatus}></ResetButton>
      </header>
    </div>
  );
}

function GameBoard({ gameStatus, turn, onMove, board }) {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div className="game-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div className="game-cell" onClick={() => onMove(rowIndex, colIndex)} key={colIndex}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

function TurnMarker({ gameStatus, turn }) {
  if (gameStatus === GameStatus.GameOver) {
    return (
      <div className="turn-marker">Player {turn} wins!</div>
    )
  } else if(gameStatus === GameStatus.Draw){
    return (
      <div className="turn-marker">Draw! Everyone wins!</div>
    )
  } else {
    return (
      <div className="turn-marker">It's player {turn}'s turn.</div>
    )
  }
}

function ResetButton({ gameStatus, onClick }) {
  if (gameStatus === GameStatus.Playing) {
    return null
  } else {
    return (
      <button onClick={onClick}>Reset</button>
    )
  }
}

export default App;
