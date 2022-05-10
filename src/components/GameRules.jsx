import React, { useRef } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

const GameRules = ({ setShowGameRules }) => {
    const popupRef = useRef();

    useOutsideClick(() => setShowGameRules(false), popupRef);

    return (
        <div className="game-rules popup-background">
            <div className="game-rules-popup popup" ref={popupRef}>
                <div className="close-button">
                    <i className="fas fa-times-circle" onClick={() => setShowGameRules(false)}></i>
                </div>
                <h1>How to play</h1>
                <p>Wizards Puzzle is a puzzle match game where the objective is to collect as many points as possible before the time runs out. To do this, simply drag the item you want to move to one of the adjacent slots and match rows or columns of 3, 4 or 5 items of the same sort. A higher number of items matched gives more points than a lower number of items, so try matching as many items of the same sort as you can. Good luck!</p>
            </div>
        </div>
    );
}
 
export default GameRules;