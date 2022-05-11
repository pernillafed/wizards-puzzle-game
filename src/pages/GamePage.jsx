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
    const { score, highScore, gameOver, newGame, createBoard, startGame } = useGameContext();
    // Custom hook to get initial high score for a specific difficulty level
    const highScoreByGameType = useHighScore(gameType, highScore, newGame);

    // Calls the startGame function in GameContext
    useEffect(() => {
        startGame();
    }, []);

    // Sets showTimeIsUp when game is over
    useEffect(() => {
        if (gameOver) {
            setShowTimeIsUp(true);
        }
    }, [gameOver]);

    // Calls the createBoard function in GameContext when new game is started
    useEffect(() => {
        if (newGame) {
            createBoard(gameType);
        }
    }, [newGame]);

    // Gets initial high score from custom hook to output as high score in the DOM
    useEffect(() => {
        setPreviousHighScore(highScoreByGameType);
    }, [highScoreByGameType]);
    
    return (
        <div className="game-page">
            <span className="game-page-type">{gameType.charAt(0).toUpperCase() + gameType.slice(1)}</span>
            <div className="content-wrapper">
                <ScoreBoard gameType={gameType} timeIsUp={showTimeIsUp} />
                <GameBoard gameType={gameType} />
            </div>
            {showTimeIsUp &&
                <TimeIsUp
                    setShowTimeIsUp={setShowTimeIsUp}
                    score={score}
                    previousHighScore={previousHighScore}
                    startGame={startGame}
                    gameType={gameType}
                    highScore={highScore}
                />}
        </div>
    );
}
 
export default GamePage;