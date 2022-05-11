import React, { useRef } from 'react';
import infoText from '../data/howToPlay.json';
import useOutsideClick from '../hooks/useOutsideClick';

const GameRules = ({ setShowGameRules }) => {
    const popupRef = useRef();

    // Calls custom hook to check for clicks outside of the popup "window"
    useOutsideClick(() => setShowGameRules(false), popupRef);

    return (
        <div className="game-rules popup-background">
            <div className="game-rules-popup popup" ref={popupRef}>
                <div className="close-button">
                    <i className="fas fa-times-circle" onClick={() => setShowGameRules(false)}></i>
                </div>
                <h1>How to play</h1>
                <p>{infoText}</p>
            </div>
        </div>
    );
}
 
export default GameRules;