import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';

const GameBoard = ({ gameType }) => {
    const {
        boardArrangement,
        createBoard,
        checkForColumnOf,
        checkForRowOf,
        moveDownAndRefill,
        touchDragStart,
        touchDragEnd
    } = useGameContext();

    const location = useLocation();

    useEffect(() => {
        createBoard(gameType);
    }, [location]);

    useEffect(() => {
        const gameLoop = setInterval(() => {
            checkForColumnOf(5);
            checkForRowOf(5);
            checkForColumnOf(4);
            checkForRowOf(4);
            checkForColumnOf(3);
            checkForRowOf(3);
            moveDownAndRefill(gameType);
        }, 200);
        return () => clearInterval(gameLoop);
    }, [boardArrangement]);

    return (
        <div className="game-board">
            {boardArrangement && boardArrangement.map((item, i) => (
                <img
                    key={i}
                    src={item}
                    alt={item}
                    data-id={i}
                    onTouchStart={touchDragStart}
                    onTouchEnd={touchDragEnd}
                />
            ))}
        </div>
    
    );
}
 
export default GameBoard;