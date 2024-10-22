import { ChessBoard } from "../components/ChessBoard/ChessBoard";
import SimpleLayout from "../components/SimpleLayout";
import { GameStateContext } from "../components/GameStateContext";

function Home() {
  return (
    <SimpleLayout>
      <GameStateContext>
        <ChessBoard />
      </GameStateContext>
    </SimpleLayout>
  );
}

export default Home;
