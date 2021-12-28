import React from 'react';
import { useParams } from 'react-router-dom';

const GamePage = () => {
    const { gameType } = useParams();
    
    return (
        <div className="game-page">
            {gameType}
        </div>
    );
}
 
export default GamePage;