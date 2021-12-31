import React from 'react';
import { useParams } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import { useGameContext } from '../contexts/GameContext';

const GamePage = () => {
    const { gameType } = useParams();
    const { createBoard } = useGameContext();
    
    return (
        <div className="game-page">
            <div className="reset-board-button" onClick={() => createBoard(gameType)}>Reset board</div>
            <GameBoard gameType={gameType} />
        </div>
    );
}
 
export default GamePage;