import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '../hooks/useOutsideClick';

const ExitGame = ({ setShowExitGame }) => {
    const navigate = useNavigate();
    const popupRef = useRef();

    const handleYesClick = () => {
        navigate("/");
        setShowExitGame(false);
    };

    // Calls custom hook to check for clicks outside of the popup "window"
    useOutsideClick(() => setShowExitGame(false), popupRef);

    return (
        <div className="exit-game popup-background">
            <div className="exit-game-popup popup" ref={popupRef}>
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