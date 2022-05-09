import Score from "./Score";

const ScoreBoard = () => {
    return (
        <div className="score-board">
            <div>Temp-time</div>
            <div className="score-wrapper">
                <Score title="Score" score="temp-score"/>
                <Score title="High score" score="temp-high"/>
            </div>
        </div>
    );
}
 
export default ScoreBoard;