import { useState, useEffect } from 'react';

const useHighScore = (gameType, highScore) => {
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
    }, []);

    return highScoreByGameType;
}
 
export default useHighScore;