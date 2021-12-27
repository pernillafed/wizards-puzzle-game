import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="hero">
                <h1>Welcome to Wizards Puzzle!</h1>
                <p>Start by choosing a game below</p>
            </div>
            <div className="game-levels">
                <Link to="/">Easy</Link>
                <Link to="/">Medium</Link>
                <Link to="/">Difficult</Link>
            </div>
        </div>
    );
}
 
export default HomePage;