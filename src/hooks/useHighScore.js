import { useState, useEffect } from 'react';

// Custom hook that gets high score from the right difficulty level
const useHighScore = (gameType, highScore, newGame) => {
    const [highScoreByGameType, setHighScoreByGameType] = useState()

    useEffect(() => {
        if (gameType === "easy" && highScore.easy) {
            setHighScoreByGameType(highScore.easy)
        } else if (gameType === "medium" && highScore.medium) {
            setHighScoreByGameType(highScore.medium)
        } else if (gameType === "difficult" && highScore.difficult) {
            setHighScoreByGameType(highScore.difficult)
        } else {
            setHighScoreByGameType(0);
        }
    }, [newGame]);

    return highScoreByGameType;
}
 
export default useHighScore;