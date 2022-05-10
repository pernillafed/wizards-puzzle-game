import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import CountDownTimer from "./CountDownTimer";
import Score from "./Score";
import useHighScore from "../hooks/useHighScore";

const ScoreBoard = ({ gameType, timeIsUp }) => {
    const [preliminaryHighScore, setPreliminaryHighScore] = useState(0);
    const {score, highScore, resetScore, createHighScore} = useGameContext();
    const highScoreByGameType = useHighScore(gameType, highScore);

    useEffect(() => {
        if (score) {
            resetScore();
        }
    }, []);

    useEffect(() => {
        if (timeIsUp) {
            createHighScore(gameType, preliminaryHighScore);
        }
    }, [timeIsUp]);

    useEffect(() => {
        if (score > preliminaryHighScore) {
            setPreliminaryHighScore(score);
        }
    }, [score]);
    
    useEffect(() => {
        setPreliminaryHighScore(highScoreByGameType);
    }, [highScore, highScoreByGameType]);

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