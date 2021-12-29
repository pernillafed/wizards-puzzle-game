import { createContext, useContext } from "react";
import gameTypes from "../data/gameTypes.json";
import { GoldenSnitch, HogwartsShield, MaraudersMap, Owl, SortingHat, TimeTurner, Wand, Blank } from "../assets/icons";
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

    const checkForColumnOfFive = () => {
        for (let i = 0; i <= 31; i++) {
            const columnOfFive = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3, i + boardWidth * 4];
            const referenceItem = boardArrangement[i];
            const isBlank = boardArrangement[i] === Blank;

            if (columnOfFive.every(item => boardArrangement[item] === referenceItem && !isBlank)) {
                columnOfFive.forEach(item => boardArrangement[item] = Blank);
                setBoardArrangement([...boardArrangement]);
                return true;
            }
        }
    };

    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3];
            const referenceItem = boardArrangement[i];
            const isBlank = boardArrangement[i] === Blank;

            if (columnOfFour.every(item => boardArrangement[item] === referenceItem && !isBlank)) {
                columnOfFour.forEach(item => boardArrangement[item] = Blank);
                setBoardArrangement([...boardArrangement]);
                return true;
            }
        }
    };
    
    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + boardWidth, i + boardWidth * 2];
            const referenceItem = boardArrangement[i];
            const isBlank = boardArrangement[i] === Blank;

            if (columnOfThree.every(item => boardArrangement[item] === referenceItem && !isBlank)) {
                columnOfThree.forEach(item => boardArrangement[item] = Blank);
                setBoardArrangement([...boardArrangement]);
                return true;
            }
        }
    };

    const values = {
        gameTypesList,
        boardArrangement,
        createBoard,
        checkForColumnOfFive,
        checkForColumnOfFour,
        checkForColumnOfThree,
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