import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameTypeCard = ({ label, description, gameTypeClass }) => {
    const navigate = useNavigate();

    return (
        <div className={`game-type-card ${gameTypeClass}`} onClick={() => navigate(`/game/${label}`)}>
            <h2>{label.charAt(0).toUpperCase() + label.slice(1)}</h2>
            <div className="game-type-description">
                <p>{description}</p>
            </div>
        </div>
    );
}
 
export default GameTypeCard;