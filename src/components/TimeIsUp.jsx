import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TimeIsUp = ({ setShowTimeIsUp, score, previousHighScore, startGame, gameType, highScore }) => {
    const navigate = useNavigate();
    // Creates fake loading to wait out any chain reaction that may occur at the end of the game
    const [loading, setLoading] = useState(true);
    const [newHighScore, setNewHighScore] = useState(0)

    // Stops the "loading" after a certain amout of time or when component unmounts
    useEffect(() => {
        const fakeLoading = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(fakeLoading);
    }, []);

    // Sets new high score at the end of the game so it can be output in the DOM
    useEffect(() => {
        if (gameType === "easy" && highScore.easy) {
            setNewHighScore(highScore.easy)
        } else if (gameType === "medium" && highScore.medium) {
            setNewHighScore(highScore.medium)
        } else {
            setNewHighScore(highScore.difficult)
        }
    }, [highScore]);

    // Calls the startGame function in GameContext (and closes popup)
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