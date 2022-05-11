import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TimeIsUp = ({ setShowTimeIsUp, score, previousHighScore, startGame, gameType, highScore }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [newHighScore, setNewHighScore] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        if (gameType === "easy" && highScore.easy) {
            setNewHighScore(highScore.easy)
        } else if (gameType === "medium" && highScore.medium) {
            setNewHighScore(highScore.medium)
        } else {
            setNewHighScore(highScore.difficult)
        }
    }, [highScore]);

    const handlePlayAgainClick = () => {
        startGame();
        setShowTimeIsUp(false);
    };

    const handleBackClick = () => {
        navigate("/");
        setShowTimeIsUp(false);
    };

    return (
        <div className="time-is-up popup-background">
            <div className="time-is-up-popup popup">
                <h1>Time is up</h1>
                {loading ? <p>Loading result...</p> : (
                    <>
                        {score > previousHighScore ? (
                            <>
                                <p className="result-text">You beat your high score!</p>
                                <p className="score-title">New high score</p>
                                <p className="total-score">{newHighScore}</p>
                            </>
                        ) : (
                            <>
                                <p className="result-text">You didn't beat your high score</p>
                                <p className="score-title">Score</p>
                                <p className="total-score">{score}</p>
                            </>
                        )}
                        <div className="button-container">
                            <div className="answer-button" onClick={handlePlayAgainClick}>Play again</div>
                            <div className="answer-button" onClick={handleBackClick}>Back to home</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
 
export default TimeIsUp;