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
        dragStart,
        touchDragEnd,
        mouseDrop
    } = useGameContext();

    const location = useLocation();

    // Updates the board according to difficulty level when location changes
    useEffect(() => {
        createBoard(gameType);
    }, [location]);

    // Creates a game loop that continuosly checks for rows and columns
    // It also moves items down and refills new ones
    // Needs boardArrangement to work properly
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
        <div className="game-board-container">
            <div className="reset-board-button" onClick={() => createBoard(gameType)}>Reset board</div>
            <div className="game-board">
                {boardArrangement && boardArrangement.map((item, i) => (
                    // onDrag... functions are for dragging on a desktop and onTouch... is for "dragging" on mobile and tablet
                    <img
                        key={i}
                        src={item}
                        alt={item}
                        data-id={i}
                        onTouchStart={dragStart}
                        onTouchEnd={touchDragEnd}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={mouseDrop}
                    />
                ))}
            </div>
        </div>
    
    );
}
 
export default GameBoard;