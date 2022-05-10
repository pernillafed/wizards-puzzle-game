import React from 'react';
import { useNavigate } from 'react-router-dom';

const TimeIsUp = ({ setShowTimeIsUp, score, previousHighScore }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/");
        setShowTimeIsUp(false);
    };

    return (
        <div className="time-is-up popup-background">
            <div className="time-is-up-popup popup">
                <h1>Time is up</h1>
                {score > previousHighScore ? (
                    <>
                        <p>You beat you high score!</p>
                        <p className="score-title">New high score</p>
                        <p className="total-score">{score}</p>
                    </>
                ) : (
                    <>
                        <p>You didn't beat your high score</p>
                        <p className="score-title">Score</p>
                        <p className="total-score">{score}</p>
                    </>
                )}
                <div className="button-container">
                    <div className="answer-button" onClick={() => setShowTimeIsUp(false)}>Play again</div>
                    <div className="answer-button" onClick={handleBackClick}>Back to home</div>
                </div>
            </div>
        </div>
    );
}
 
export default TimeIsUp;