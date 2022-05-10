import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import TimeIsUp from '../components/TimeIsUp';
import { useGameContext } from '../contexts/GameContext';
import useHighScore from '../hooks/useHighScore';

const GamePage = () => {
    const [showTimeIsUp, setShowTimeIsUp] = useState(false);
    const [previousHighScore, setPreviousHighScore] = useState(0);
    const { gameType } = useParams();
    const { score, highScore, gameOver, createBoard } = useGameContext();
    const highScoreByGameType = useHighScore(gameType, highScore);

    useEffect(() => {
        if (gameOver) {
            setShowTimeIsUp(true);
        }
    }, [gameOver]);

    useEffect(() => {
        setPreviousHighScore(highScoreByGameType);
    }, [highScoreByGameType]);
    
    return (
        <div className="game-page">
            <span className="game-page-type">{gameType.charAt(0).toUpperCase() + gameType.slice(1)}</span>
            <ScoreBoard gameType={gameType} timeIsUp={showTimeIsUp} />
            <div className="reset-board-button" onClick={() => createBoard(gameType)}>Reset board</div>
            <GameBoard gameType={gameType} />
            {showTimeIsUp && <TimeIsUp setShowTimeIsUp={setShowTimeIsUp} score={score} previousHighScore={previousHighScore} />}
        </div>
    );
}
 
export default GamePage;