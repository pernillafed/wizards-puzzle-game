import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';

const GameBoard = ({ gameType }) => {
    const { boardArrangement, createBoard, checkForColumnOfFive, checkForColumnOfFour, checkForColumnOfThree } = useGameContext();
    const location = useLocation();

    useEffect(() => {
        createBoard(gameType);
    }, [location]);

    useEffect(() => {
        const gameLoop = setInterval(() => {
            checkForColumnOfFive();
            checkForColumnOfFour();
            checkForColumnOfThree();
        }, 500);
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