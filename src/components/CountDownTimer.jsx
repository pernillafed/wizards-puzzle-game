import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";

const CountDownTimer = ({ gameType }) => {
    const [timer, setTimer] = useState("00:00");
    const [startTimeInMs, setStartTimeInMs] = useState(null);
    const {newGame, endGame} = useGameContext();

    useEffect(() => {
        if (gameType === "easy") {
            setStartTimeInMs(900000);
        } else if (gameType === "medium") {
            setStartTimeInMs(600000);
        } else {
            setStartTimeInMs(300000);
        }
    }, []);

    useEffect(() => {
        if (startTimeInMs && newGame) {
            let countDownTime = startTimeInMs;
            const countDown = setInterval(() => {
                const minutes = Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((countDownTime % (1000 * 60)) / 1000);
                setTimer(`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
                countDownTime = countDownTime - 1000;
                if (countDownTime < 0) {
                    clearInterval(countDown);
                    endGame();
                }
            }, 1000);
            
            return () => {
                clearInterval(countDown);
                setTimer("00:00");
            }
        }
    }, [startTimeInMs, newGame]);

    return (
        <div className="count-down-timer">
            <p className="timer">{timer}</p>
        </div>
    );
}
 
export default CountDownTimer;