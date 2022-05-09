import { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";

const CountDownTimer = ({ gameType }) => {
    const {timer, getStartTime} = useGameContext();

    useEffect(() => {
        getStartTime(gameType);
    }, []);

    return (
        <div className="count-down-timer">
            <p className="timer">{timer}</p>
        </div>
    );
}
 
export default CountDownTimer;