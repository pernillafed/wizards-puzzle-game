const Score = ({ title, score }) => {
    return (
        <div className="score">
            <div className="heading">{title}</div>
            <div className="score-counter">{score}</div>
        </div>
    );
}
 
export default Score;