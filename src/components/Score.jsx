const Score = ({ title, score }) => {
    return (
        <div className="score">
            <h2 className="score-heading">{title}</h2>
            <p className="score-counter">{score}</p>
        </div>
    );
}
 
export default Score;