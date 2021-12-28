import React from 'react';
import { useParams } from 'react-router-dom';
import GameBoard from '../components/GameBoard';

const GamePage = () => {
    const { gameType } = useParams();
    
    return (
        <div className="game-page">
            <GameBoard gameType={gameType} />
        </div>
    );
}
 
export default GamePage;