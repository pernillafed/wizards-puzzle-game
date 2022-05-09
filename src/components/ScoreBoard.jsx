import CountDownTimer from "./CountDownTimer";
import Score from "./Score";

const ScoreBoard = ({ gameType }) => {
    return (
        <div className="score-board">
            <CountDownTimer gameType={gameType} />
            <div className="score-wrapper">
                <Score title="Score" score="30"/>
                <Score title="High score" score="105"/>
            </div>
        </div>
    );
}
 
export default ScoreBoard;