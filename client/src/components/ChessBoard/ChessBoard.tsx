import { useCallback } from "react";
import { Chess, PieceSymbol } from "chess.js";
import { Chessboard } from "react-chessboard";
import {
  Piece,
  PromotionPieceOption,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { useGameContext } from "../GameStateContext";
import { EndGameOverlay } from "./EndGameOverlay";

export default function PlayRandomMoveEngine() {
  const {
    gameOver,
    handleReset,
    game,
    setGame,
    savedGame,
    setSavedGame,
    makeAMove,
    promotion,
    setPromotion,
  } = useGameContext();

  const makeOpponentMove = useCallback(() => {
    console.log("making random move");
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    game.move(possibleMoves[randomIndex]);
    const updatedGame = new Chess(game.fen());
    setGame(updatedGame);
  }, [game]);

  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
      console.log("dropping");
      if (
        piece.toLocaleLowerCase().includes("p") &&
        (targetSquare.includes("8") || targetSquare.includes("1"))
      ) {
        console.log("PROMOTIONS!", piece);
        return false;
      }

      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
      });

      if (move === null) {
        console.log("move is null");
        return false;
      }

      setTimeout(makeOpponentMove, 200);

      return true;
    },
    [makeAMove, makeOpponentMove]
  );

  const onPromotion = useCallback(
    (
      piece?: PromotionPieceOption,
      promoteFromSquare?: Square,
      promoteToSquare?: Square
    ) => {
      console.log("promoting");
      if (!piece || !promoteFromSquare || !promoteToSquare) {
        console.log("missing promotion data");
        return false;
      }

      const prom = convertToChessJs(piece);

      setPromotion(prom);

      return true;
    },
    [promotion, setPromotion]
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {gameOver && <EndGameOverlay />}

      {/* Developer tools */}
      <div className="w-full flex justify-center gap-4 items-center mt-4">
        <button
          onClick={() => {
            console.log(game.fen());
            setSavedGame(game.fen());
          }}
          className="border-2 rounded-lg text-center p-2"
        >
          Save Game
        </button>
        <button
          onClick={handleReset}
          className="border-2 rounded-lg text-center p-2"
        >
          Reset
        </button>
        <div className="text-xs">Saved Game: {savedGame}</div>
      </div>

      {/* Chessboard */}
      <div className="flex flex-grow items-center justify-center">
        <Chessboard
          id="chessboard"
          boardWidth={600}
          customBoardStyle={{
            borderRadius: "4px",
          }}
          position={game.fen()}
          onPieceDrop={onDrop}
          onPromotionPieceSelect={onPromotion}
        />
      </div>
    </div>
  );
}

const convertToChessJs = (piece: PromotionPieceOption): PieceSymbol => {
  // export declare type (chessjs) PieceSymbol = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
  // export type (chessboard) PromotionPieceOption = "wQ" | "wR" | "wN" | "wB" | "bQ" | "bR" | "bN" | "bB";
  // this could work too:
  // return piece.toLowerCase().split("")[1] as PieceSymbol; // "wQ" -> "q"
  switch (piece) {
    case "bB":
    case "wB":
      return "b";
    case "bN":
    case "wN":
      return "n";
    case "bR":
    case "wR":
      return "r";
    case "bQ":
    case "wQ":
    default:
      return "q";
  }
};
