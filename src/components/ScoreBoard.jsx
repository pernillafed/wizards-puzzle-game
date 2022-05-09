import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import CountDownTimer from "./CountDownTimer";
import Score from "./Score";

const ScoreBoard = ({ gameType }) => {
    const {score, highScore, gameOver, resetScore, createHighScore} = useGameContext();
    const [preliminaryHighScore, setPreliminaryHighScore] = useState(0)

    useEffect(() => {
        if (score) {
            resetScore();
        }
    }, []);

    useEffect(() => {
        if (gameOver) {
            createHighScore(gameType, preliminaryHighScore);
        }
    }, [gameOver]);

    useEffect(() => {
        if (score > preliminaryHighScore) {
            setPreliminaryHighScore(score);
        }
    }, [score]);

    useEffect(() => {
        if (gameType === "easy" && highScore.easy) {
            setPreliminaryHighScore(highScore.easy)
        } else if (gameType === "medium" && highScore.medium) {
            setPreliminaryHighScore(highScore.medium)
        } else if (gameType === "difficult" && highScore.difficult) {
            setPreliminaryHighScore(highScore.difficult)
        } else {
            setPreliminaryHighScore(0);
        }
    }, [highScore]);

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