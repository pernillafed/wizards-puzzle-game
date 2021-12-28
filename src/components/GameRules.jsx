import React from 'react';

const GameRules = ({ setShowGameRules }) => {
    return (
        <div className="game-rules">
            <div className="game-rules-popup">
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