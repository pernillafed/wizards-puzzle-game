import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ExitGame from './ExitGame';
import GameRules from './GameRules';

const Navbar = () => {
    const [inGame, setInGame] = useState(false);
    const [showGameRules, setShowGameRules] = useState(false);
    const [showExitGame, setShowExitGame] = useState(false);
    const location = useLocation();

    // Sets inGame to true when on a game page so that back button can be dynamically output
    useEffect(() => {
        if (location.pathname.includes("game")) {
            setInGame(true);
        } else {
            setInGame(false);
        }
    }, [location]);

    return (
        <>
            <div className="navbar">
                <div className="back-button">
                    {inGame && <i className="fas fa-arrow-alt-circle-left" onClick={() => setShowExitGame(true)}></i>}
                </div>
                <div className="logo">
                    <span className="logo-compact">WP</span>
                    <span className="logo-full">Wizards Puzzle</span>
                </div>
                <div className="info-button">
                    <i className="fas fa-info-circle" onClick={() => setShowGameRules(true)}></i>
                </div>
            </div>
            {showExitGame && <ExitGame setShowExitGame={setShowExitGame} />}
            {showGameRules && <GameRules setShowGameRules={setShowGameRules} />}
        </>
    );
}
 
export default Navbar;