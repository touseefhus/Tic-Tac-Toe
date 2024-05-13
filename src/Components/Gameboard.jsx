export default function GameBoard({ onSelectSquare, board }) {
  return (
    <>
      <ol className="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    className="game-button"
                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                    disabled={playerSymbol !== null}
                  >
                    {playerSymbol}
                  </button>{" "}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
