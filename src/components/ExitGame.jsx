import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExitGame = ({ setShowExitGame }) => {
    const navigate = useNavigate();

    const handleYesClick = () => {
        navigate("/");
        setShowExitGame(false);
    };

    return (
        <div className="exit-game popup-background">
            <div className="exit-game-popup popup">
                <h1>Are you sure you want to leave the game?</h1>
                <p>(Any progress will be lost)</p>
                <div className="button-container">
                    <div className="answer-button" onClick={handleYesClick}>Yes</div>
                    <div className="answer-button" onClick={() => setShowExitGame(false)}>No</div>
                </div>
            </div>
        </div>
    );
}
 
export default ExitGame;