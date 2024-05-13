import React, { useState } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/Gameboard";
import "./App.css";
import Log from "./Components/Log";
import GameOver from "./Components/Gameover";
import { WINNING_COMBINATIONS } from "./Components/Winning_combination";

function driveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App = () => {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const activePlayer = driveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secodSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secodSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    const currentPlayer = driveActivePlayer(gameTurns);

    const updatedTurns = [
      { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ...gameTurns,
    ];

    setGameTurns(updatedTurns);
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <div className="container">
      {(winner || hasDraw) && (
        <GameOver winner={winner} onRestart={handleRestart} />
      )}
      <main>
        <div className="game-container">
          <ol id="players" className="highlight-palyer">
            <Player
              intialName="PLAYER 1"
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerName}
            />
            <Player
              intialName="PLAYER 2"
              symbol="O" // Corrected from "0" to "O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerName}
            />
          </ol>
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </div>
  );
};

export default App;
