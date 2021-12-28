import React from 'react';
import GameTypeCard from '../components/GameTypeCard';
import { useGameContext } from '../contexts/GameContext';

const HomePage = () => {
    const { gameTypesList } = useGameContext();

    return (
        <div className="home-page">
            <div className="hero">
                <h1>Welcome to Wizards Puzzle!</h1>
                <p>Start by choosing a game below</p>
            </div>
            <div className="game-types">
                {gameTypesList && gameTypesList.map(gameType => (
                    <GameTypeCard key={gameType.label} label={gameType.label} description={gameType.description} gameTypeClass={gameType.gameTypeClass} />
                ))}
            </div>
        </div>
    );
}
 
export default HomePage;