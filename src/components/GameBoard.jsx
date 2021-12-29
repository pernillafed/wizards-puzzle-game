import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';

const GameBoard = ({ gameType }) => {
    const { boardArrangement, createBoard, checkForColumnOf, checkForRowOf } = useGameContext();

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
        }, 1000);
        return () => clearInterval(gameLoop);
    }, [boardArrangement]);

    return (
        <div className="game-board">
            {boardArrangement && boardArrangement.map((item, i) => (
                <img src={item} alt={item} key={i} />
            ))}
        </div>
    
    );
}
 
export default GameBoard;