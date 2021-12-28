import { createContext, useContext } from "react";
import gameTypes from "../data/gameTypes.json";
import { GoldenSnitch, HogwartsShield, MaraudersMap, Owl, SortingHat, TimeTurner, Wand } from "../assets/icons";
import { useState } from "react/cjs/react.development";

const GameContext = createContext();

const useGameContext = () => {
    return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
    const boardWidth = 8;
    let items = [];
    const gameTypesList = gameTypes.map(type => {
        return {...type};
    });
    
    const [boardArrangement, setBoardArrangement] = useState([]);
    
    const createBoard = (gameType) => {
        const randomItemList = [];
        if (gameType === "easy") {
            items = [GoldenSnitch, HogwartsShield, Owl, SortingHat, Wand];
        } else if (gameType === "medium") {
            items = [GoldenSnitch, HogwartsShield, Owl, SortingHat, Wand, MaraudersMap];
        } else {
            items = [GoldenSnitch, HogwartsShield, Owl, SortingHat, Wand, MaraudersMap, TimeTurner];
        }
        for (let i = 0; i < boardWidth * boardWidth; i++) {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            randomItemList.push(randomItem);
        }
        setBoardArrangement(randomItemList);
    };

    const values = {
        gameTypesList,
        boardArrangement,
        createBoard
    };

    return ( 
        <GameContext.Provider value={values}>
            {children}
        </GameContext.Provider>
    );
}
 
export {
    useGameContext,
    GameContextProvider as default
}