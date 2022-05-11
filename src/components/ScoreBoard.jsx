import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import CountDownTimer from "./CountDownTimer";
import Score from "./Score";
import useHighScore from "../hooks/useHighScore";

const ScoreBoard = ({ gameType, timeIsUp }) => {
    const [preliminaryHighScore, setPreliminaryHighScore] = useState(0);
    const {score, highScore, newGame, createHighScore} = useGameContext();
    // Custom hook to get initial high score for a specific difficulty level
    const highScoreByGameType = useHighScore(gameType, highScore, newGame);

    // Calls the createHighScore function in GameContext when time is up
    useEffect(() => {
        if (timeIsUp) {
            createHighScore(gameType, preliminaryHighScore);
        }
    }, [timeIsUp]);

    // Sets preliminary high score to score when score is higher so that high score also updates in the DOM as you play
    useEffect(() => {
        if (score > preliminaryHighScore) {
            setPreliminaryHighScore(score);
        }
    }, [score]);
    
    // Gets initial high score from custom hook to output as high score in the DOM
    useEffect(() => {
        setPreliminaryHighScore(highScoreByGameType);
    }, [highScoreByGameType]);

    return (
        <div className="score-board">
            <CountDownTimer gameType={gameType} />
            <div className="score-wrapper">
                <Score title="Score" score={score} />
                <Score title="High score" score={preliminaryHighScore} />
            </div>
        </div>
    );
}
 
export default ScoreBoard;