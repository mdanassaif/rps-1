"use client";
import { useState } from "react";
import { Choice, GameStage } from "@/types/game";
import { ChoiceButton } from "./ChoiceButton";
import { ScoreBoard } from "./ScoreBoard";
import confetti from "canvas-confetti";

export default function GameBoard() {
  const [playerName, setPlayerName] = useState("");
  const [stage, setStage] = useState<GameStage>("name");
  const [playerChoices, setPlayerChoices] = useState<[Choice?, Choice?]>([]);
  const [computerChoices, setComputerChoices] = useState<[Choice?, Choice?]>(
    []
  );
  const [finalChoices, setFinalChoices] = useState<{
    player: Choice | null;
    computer: Choice | null;
  }>({ player: null, computer: null });
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const choices: Choice[] = ["rock", "paper", "scissors"];

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setStage("rules");
    }
  };

  const handlePlayerChoices = (index: 0 | 1, choice: Choice) => {
    const newChoices = [...playerChoices] as [Choice?, Choice?];
    newChoices[index] = choice;
    setPlayerChoices(newChoices);
  };

  const submitPlayerChoices = async () => {
    if (playerChoices[0] && playerChoices[1]) {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const computerChoice1 = choices[Math.floor(Math.random() * 3)];
      const computerChoice2 = choices[Math.floor(Math.random() * 3)];
      setComputerChoices([computerChoice1, computerChoice2]);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsProcessing(false);
      setStage("computerShow");
    }
  };

  const determineWinner = (
    player: Choice,
    computer: Choice
  ): "win" | "lose" | "draw" => {
    if (player === computer) return "draw";

    const rules = {
      paper: "rock",
      rock: "scissors",
      scissors: "paper",
    };

    return rules[player] === computer ? "win" : "lose";
  };

  const removeChoice = async (choiceToKeep: Choice) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const finalComputerChoice = computerChoices[Math.floor(Math.random() * 2)]!;
    setFinalChoices({
      player: choiceToKeep,
      computer: finalComputerChoice,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const gameResult = determineWinner(choiceToKeep, finalComputerChoice);
    setResult(gameResult);

    if (gameResult === "win") {
      setScore((prev) => ({ ...prev, player: prev.player + 1 }));
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else if (gameResult === "lose") {
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    }

    setIsProcessing(false);
    setStage("result");
  };

  const resetGame = () => {
    setStage("selection");
    setPlayerChoices([]);
    setComputerChoices([]);
    setFinalChoices({ player: null, computer: null });
    setResult(null);
    setIsProcessing(false);
  };

  return (
    <div className="relative min-h-screen flex items-center">
      {stage !== "name" && (
        <ScoreBoard
          playerName={playerName}
          playerScore={score.player}
          computerScore={score.computer}
        />
      )}

      <div className="w-full max-w-2xl mx-auto p-4">
        {stage === "name" && (
          <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-yellow-50 p-4">
            <div className="bg-white rounded-xl   p-8 w-full max-w-md transform transition-all">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <span className="text-6xl">🎮</span>
                  <span className="absolute -bottom-2 -right-2 text-4xl">
                    ✌️
                  </span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Rock Paper Scissors -1
              </h2>
              <form onSubmit={handleNameSubmit} className="space-y-4">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name to play"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-400 text-center text-lg"
                  maxLength={20}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-lg 
                    font-semibold hover:from-emerald-500 hover:to-emerald-600 transform hover:scale-[1.02] 
                    transition-all duration-200 text-lg  "
                >
                  Start Playing
                </button>
              </form>
            </div>
          </div>
        )}

        {stage === "rules" && (
          <div className="bg-white rounded-xl  p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Hey {playerName}! 👋
            </h2>
            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-emerald-700 mb-4">
                  Quick Rules
                </h3>
                <ul className="space-y-3 text-emerald-600">
                  <li className="flex items-center gap-3">
                    <span className="text-lg">🎯</span>
                    <span>Pick two weapons</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">🤖</span>
                    <span>Computer picks two weapons</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">⚔️</span>
                    <span>Choose your final weapon</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-lg">🏆</span>
                    <span>Winner takes all!</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setStage("selection")}
                className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-lg 
                  font-semibold hover:from-emerald-500 hover:to-emerald-600 transform hover:scale-[1.02] 
                  transition-all duration-200  "
              >
                Let's Battle!
              </button>
            </div>
          </div>
        )}

        {stage === "selection" && (
          <div className="bg-white rounded-xl   p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Choose Your Weapons
            </h2>
            <div className="space-y-10">
              {[0, 1].map((index) => (
                <div key={index}>
                  <p className="text-lg font-medium text-emerald-600 mb-4">
                    Weapon {index + 1}
                  </p>
                  <div className="flex justify-center gap-8">
                    {choices.map((choice) => (
                      <ChoiceButton
                        key={choice}
                        choice={choice}
                        selected={playerChoices[index] === choice}
                        onClick={() =>
                          handlePlayerChoices(index as 0 | 1, choice)
                        }
                        size="large"
                        disabled={isProcessing}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {playerChoices[0] && playerChoices[1] && (
                <button
                  onClick={submitPlayerChoices}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-lg 
                    font-semibold hover:from-emerald-500 hover:to-emerald-600 transform hover:scale-[1.02] 
                    transition-all duration-200  disabled:from-gray-400 
                    disabled:to-gray-500 disabled:transform-none"
                >
                  {isProcessing ? "Processing..." : "Ready for Battle!"}
                </button>
              )}
            </div>
          </div>
        )}

        {stage === "computerShow" && (
          <div className="bg-white rounded-xl  p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Battle Time!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 rounded-lg p-6">
                <p className="text-lg font-medium text-emerald-600 mb-4">
                  Your Arsenal
                </p>
                <div className="flex justify-center gap-6">
                  {playerChoices.map(
                    (choice, i) =>
                      choice && (
                        <ChoiceButton
                          key={i}
                          choice={choice}
                          onClick={() => {}}
                          disabled={true}
                        />
                      )
                  )}
                </div>
              </div>
              <div className="bg-rose-50 rounded-lg p-6">
                <p className="text-lg font-medium text-rose-600 mb-4">
                  Computer's Arsenal
                </p>
                <div className="flex justify-center gap-6">
                  {computerChoices.map(
                    (choice, i) =>
                      choice && (
                        <ChoiceButton
                          key={i}
                          choice={choice}
                          onClick={() => {}}
                          disabled={true}
                        />
                      )
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setStage("removal")}
              className="mt-8 w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-lg 
                font-semibold hover:from-emerald-500 hover:to-emerald-600 transform hover:scale-[1.02] 
                transition-all duration-200  "
            >
              Choose Final Weapon
            </button>
          </div>
        )}

        {stage === "removal" && (
          <div className="bg-white rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Final Choice
            </h2>
            <p className="text-lg text-emerald-600 mb-8">
              Select your winning weapon!
            </p>
            <div className="flex justify-center gap-8">
              {playerChoices.map(
                (choice, i) =>
                  choice && (
                    <ChoiceButton
                      key={i}
                      choice={choice}
                      onClick={() => !isProcessing && removeChoice(choice)}
                      size="large"
                      disabled={isProcessing}
                    />
                  )
              )}
            </div>
          </div>
        )}

        {stage === "result" &&
          result &&
          finalChoices.player &&
          finalChoices.computer && (
            <div className="bg-white rounded-xl   p-8">
              <h2
                className={`text-3xl font-bold text-center mb-8 ${
                  result === "win"
                    ? "text-yellow-500"
                    : result === "lose"
                    ? "text-rose-500"
                    : "text-gray-700"
                }`}
              >
                {result === "win"
                  ? "🎉 Victory!"
                  : result === "lose"
                  ? "💔 Defeat!"
                  : "🤝 It's a Draw!"}
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                <div className="text-center">
                  <p className="text-lg font-medium text-emerald-600 mb-4">
                    Your Choice
                  </p>
                  <ChoiceButton
                    choice={finalChoices.player}
                    onClick={() => {}}
                    size="large"
                    disabled
                  />
                </div>
                <div className="text-4xl font-bold text-gray-300">VS</div>
                <div className="text-center">
                  <p className="text-lg font-medium text-rose-600 mb-4">
                    Computer's Choice
                  </p>
                  <ChoiceButton
                    choice={finalChoices.computer}
                    onClick={() => {}}
                    size="large"
                    disabled
                  />
                </div>
              </div>
              <button
                onClick={resetGame}
                className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-lg 
                font-semibold hover:from-emerald-500 hover:to-emerald-600 transform hover:scale-[1.02] 
                transition-all duration-200  "
              >
                Play Again
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
