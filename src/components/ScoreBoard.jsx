import { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import CountDownTimer from "./CountDownTimer";
import Score from "./Score";

const ScoreBoard = ({ gameType }) => {
    const {score, resetScore} = useGameContext();

    useEffect(() => {
        if (score) {
            resetScore();
        }
    }, []);

    return (
        <div className="score-board">
            <CountDownTimer gameType={gameType} />
            <div className="score-wrapper">
                <Score title="Score" score={score} />
                <Score title="High score" score="105"/>
            </div>
        </div>
    );
}
 
export default ScoreBoard;