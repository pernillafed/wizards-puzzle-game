import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GameRules from './GameRules';

const Navbar = () => {
    const [inGame, setInGame] = useState(false);
    const [showGameRules, setShowGameRules] = useState(false);
    const location = useLocation();

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
                    {inGame && <i className="fas fa-arrow-alt-circle-left"></i>}
                </div>
                <div className="logo">
                    <span className="logo-compact">WP</span>
                    <span className="logo-full">Wizards Puzzle</span>
                </div>
                <div className="info-button">
                    <i className="fas fa-info-circle" onClick={() => setShowGameRules(!showGameRules)}></i>
                </div>
            </div>
            {showGameRules && <GameRules setShowGameRules={setShowGameRules} />}
        </>
    );
}
 
export default Navbar;