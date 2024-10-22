import { useGameContext } from "../GameStateContext";

export const EndGameOverlay = () => {
  const { handleReset } = useGameContext();

  return (
    <div className="flex items-center justify-center absolute bg-opacity-20 w-full h-full bg-blue-400 rounded-lg p-4 z-10 shadow-md top-0">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="font-roboto text-xl font-bold text-black">
          The game is over, want to restart?
        </h1>
        <button
          onClick={handleReset}
          className="px-6 border-black text-black text-xl font-extrabold border-2 rounded-lg text-center p-2"
        >
          Restart
        </button>
      </div>
    </div>
  );
};
