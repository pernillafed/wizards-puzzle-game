import Score from "./Score";

const ScoreBoard = () => {
    return (
        <div className="score-board">
            <div>Temp-time</div>
            <div className="score-wrapper">
                <Score title="Score" score="30"/>
                <Score title="High score" score="105"/>
            </div>
        </div>
    );
}
 
export default ScoreBoard;