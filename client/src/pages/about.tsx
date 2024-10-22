import SimpleLayout from "../components/SimpleLayout";

function About() {
  return (
    <SimpleLayout>
      <div className="h-full flex flex-col justify-center max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-4">Chess Game with AI</h1>
        <p className="mb-4">
          This project aims to create a chess game with an AI opponent. The game
          has been implemented using the object-oriented programming paradigm in
          Python. The AI opponent uses the{" "}
          <a className="underline" href="https://en.wikipedia.org/wiki/Minimax">
            minimax algorithm
          </a>{" "}
          along with{" "}
          <a
            className="underline"
            href="https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning"
          >
            alpha-beta pruning
          </a>{" "}
          to make its moves.
        </p>
        <p className="mb-4">The project consists of several classes:</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Board class:</strong> Represents the chess board.
          </li>
          <li>
            <strong>Piece class:</strong> Represents individual chess pieces.
          </li>
          <li>
            <strong>TreeNode class:</strong> Represents the nodes of the game
            tree for the AI to use in its decision making.
          </li>
        </ul>
        <p className="mb-4">
          The <code>main.py</code> file initializes the game and contains the
          main game loop where moves are made by the player and the AI opponent.
          The AI's move is determined by calling the search function in the{" "}
          <code>main.py</code> file, which uses the minimax algorithm along with
          alpha-beta pruning to make its move.
        </p>
      </div>
    </SimpleLayout>
  );
}

export default About;
