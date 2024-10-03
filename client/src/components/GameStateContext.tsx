import { Chess } from "chess.js";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useCallback,
} from "react";

// Define the type for the context value
interface GameContextType {
  gameOver: boolean;
  game: Chess;

  savedGame: string | null;
  setSavedGame: (value: string | null) => void;

  promotion: string;
  setPromotion: (value: string) => void;

  makeAMove: (move: { from: string; to: string }) => void;
  makeOpponentMove: () => void;

  handleReset: () => void;
}

// Create the context with an undefined initial value
const GameContext = createContext<GameContextType>({
  gameOver: false,
  game: new Chess(),

  savedGame: null,
  setSavedGame: () => {},

  promotion: "q",
  setPromotion: () => {},

  makeAMove: () => {},
  makeOpponentMove: () => {},

  handleReset: () => {},
});

// Custom hook for consuming the context
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const GameStateContext: FC<Props> = ({ children }) => {
  // State to manage whether the game is over
  const [gameOver, setGameOver] = useState<boolean>(false);

  // State to manage the current game state
  const [game, setGame] = useState<Chess>(new Chess());

  // State to manage the saved game state
  const [savedGame, setSavedGame] = useState<string | null>(null);

  const [promotion, setPromotion] = useState<string>("q");

  // Handle Moves for client and server
  const makeAMove = useCallback(
    (move: { from: string; to: string }) => {
      // If the move is valid, update the game state with a new Chess instance
      console.log("making move");
      if (move !== null) {
        game.move({ ...move, promotion }); // Make the move
        const updatedGame = new Chess(game.fen()); // Create a new Chess instance with the updated FEN
        setGame(updatedGame); // Update the state with the new instance

        if (updatedGame.isGameOver() || updatedGame.isDraw()) {
          console.log("the game is over");
          setGameOver(true);
        }
      }
    },
    [game, promotion]
  );

  const makeOpponentMove = useCallback(async (): Promise<void> => {
    try {
      console.log(
        `num: ${game.moveNumber()}
        pgn: """${game.pgn()}"""

      `
      );

      const response = await fetch("http://localhost:8080/next_move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pgn: "e4e5",
          user_id: "2",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: string = await response.json();
      alert("data: " + data);

      return data; // Assuming the response is a string of the next move
    } catch (error) {
      console.log("endpoint failure, resorting to random moves");
      const possibleMoves = game.moves();
      if (!game.isGameOver() && !game.isDraw() && possibleMoves.length !== 0) {
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);

        game.move(possibleMoves[randomIndex]);
        const updatedGame = new Chess(game.fen());
        setGame(updatedGame);
      } else {
        console.error("AI failed to return move and no random moves:", error);
        throw error;
      }
    }
  }, [game]);

  const handleReset = useCallback(() => {
    setGameOver(false);
    if (savedGame != null) {
      console.log("resetting game to saved game");
      setGame(new Chess(savedGame));
    } else {
      game.reset();
      // setGame();
    }
  }, [game, savedGame]);

  // Value to be shared across the app
  const value = {
    gameOver,
    game,
    savedGame,
    setSavedGame,
    makeAMove,
    makeOpponentMove,
    promotion,
    setPromotion,
    handleReset,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
