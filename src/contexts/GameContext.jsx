import { createContext, useContext } from "react";
import gameTypes from "../data/gameTypes.json";
import { GoldenSnitch, HogwartsShield, MaraudersMap, Owl, SortingHat, TimeTurner, Wand, Blank } from "../assets/icons";
import { useEffect, useState } from "react/cjs/react.development";

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
    const [itemBeingDragged, setItemBeingDragged] = useState(null);
    const [itemBeingReplaced, setItemBeingReplaced] = useState(null);

    useEffect(() => {
        if (itemBeingDragged && itemBeingReplaced) {
            const itemBeingDraggedId = parseInt(itemBeingDragged.getAttribute("data-id"));
            const itemBeingReplacedId = parseInt(itemBeingReplaced.getAttribute("data-id"));
    
            boardArrangement[itemBeingReplacedId] = itemBeingDragged.getAttribute("src");
            boardArrangement[itemBeingDraggedId] = itemBeingReplaced.getAttribute("src");
    
            const isValidMove = validMove(itemBeingDraggedId, itemBeingReplacedId);
    
            let isAColumnOfFive = false;
            let isAColumnOfFour = false;
            let isAColumnOfThree = false;
            let isARowOfFive = false;
            let isARowOfFour = false;
            let isARowOfThree = false;

            if (isValidMove) {
                isAColumnOfFive = checkForColumnOf(5);
                isAColumnOfFour = checkForColumnOf(4);
                isAColumnOfThree = checkForColumnOf(3);
                isARowOfFive = checkForRowOf(5);
                isARowOfFour = checkForRowOf(4);
                isARowOfThree = checkForRowOf(3);
            }
    
            if (
                itemBeingReplacedId &&
                isValidMove &&
                (isAColumnOfFive || isAColumnOfFour || isAColumnOfThree || isARowOfFive || isARowOfFour || isARowOfThree)
            ) {
                setItemBeingDragged(null);
                setItemBeingReplaced(null);
            } else {
                boardArrangement[itemBeingReplacedId] = itemBeingReplaced.getAttribute("src");
                boardArrangement[itemBeingDraggedId] = itemBeingDragged.getAttribute("src");
                setItemBeingDragged(null);
                setItemBeingReplaced(null);
                setBoardArrangement([...boardArrangement]);
            }
        }
    }, [itemBeingDragged, itemBeingReplaced]);
    
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

    const checkForColumnOf = (amountOfItems) => {
        let lastIndex;
        
        if (amountOfItems === 5) {
            lastIndex = 31;
        } else if (amountOfItems === 4) {
            lastIndex = 39;
        } else {
            lastIndex = 47;
        }
        
        for (let i = 0; i <= lastIndex; i++) {
            let column;

            if (amountOfItems === 5) {
                column = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3, i + boardWidth * 4];
            } else if (amountOfItems === 4) {
                column = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3];
            } else {
                column = [i, i + boardWidth, i + boardWidth * 2];
            }
            
            const referenceItem = boardArrangement[i];
            const isBlank = boardArrangement[i] === Blank;

            if (column.every(item => boardArrangement[item] === referenceItem && !isBlank)) {
                column.forEach(item => boardArrangement[item] = Blank);
                setBoardArrangement([...boardArrangement]);
                return true;
            }
        }
    };

    const checkForRowOf = (amountOfItems) => {
        const notValid = [];

        for (let i = boardWidth - amountOfItems; i <= boardWidth * boardWidth - amountOfItems; i += boardWidth) {
            if (amountOfItems === 5) {
                notValid.push(i + 1, i + 2, i + 3, i + 4);
            } else if (amountOfItems === 4) {
                notValid.push(i + 1, i + 2, i + 3);
            } else {
                notValid.push(i + 1, i + 2);
            }
        }

        for (let i = 0; i < boardWidth * boardWidth; i++) {
            let row;

            if (amountOfItems === 5) {
                row = [i, i + 1, i + 2, i + 3, i + 4];
            } else if (amountOfItems === 4) {
                row = [i, i + 1, i + 2, i + 3];
            } else {
                row = [i, i + 1, i + 2];
            }
            const referenceItem = boardArrangement[i];
            const isBlank = boardArrangement[i] === Blank;

            if (notValid.includes(i)) continue;

            if (row.every(item => boardArrangement[item] === referenceItem && !isBlank)) {
                row.forEach(item => boardArrangement[item] = Blank);
                setBoardArrangement([...boardArrangement]);
                return true;
            }
        }
    };

    const moveDownAndRefill = (gameType) => {
        if (gameType === "easy") {
            items = [GoldenSnitch, HogwartsShield, Owl, SortingHat, Wand];
        } else if (gameType === "medium") {
            items = [GoldenSnitch, HogwartsShield, Owl, SortingHat, Wand, MaraudersMap];
        } else {
            items = [GoldenSnitch, HogwartsShield, Owl, SortingHat, Wand, MaraudersMap, TimeTurner];
        }

        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            
            if (firstRow.includes(i) && boardArrangement[i] === Blank) {
                let randomItem = items[Math.floor(Math.random() * items.length)];
                boardArrangement[i] = randomItem;
                setBoardArrangement([...boardArrangement]);
            }
            
            if ((boardArrangement[i + boardWidth]) === Blank) {
                boardArrangement[i + boardWidth] = boardArrangement[i];
                boardArrangement[i] = Blank;
                setBoardArrangement([...boardArrangement]);
            }
            
        }
    };

    const validMove = (itemBeingDraggedId, itemBeingReplacedId) => {
        const validMoves = [];
        const firstColumn = [];
        const lastColumn = [];

        for (let i = 0; i < boardWidth * boardWidth; i += boardWidth) firstColumn.push(i);
        for (let i = boardWidth - 1; i < boardWidth * boardWidth; i += boardWidth) lastColumn.push(i);

        if (firstColumn.includes(itemBeingDraggedId)) {
            validMoves.push(itemBeingDraggedId - boardWidth, itemBeingDraggedId + 1, itemBeingDraggedId + boardWidth);
        } else if (lastColumn.includes(itemBeingDraggedId)) {
            validMoves.push(itemBeingDraggedId - 1, itemBeingDraggedId - boardWidth, itemBeingDraggedId + boardWidth);
        } else {
            validMoves.push(itemBeingDraggedId - 1, itemBeingDraggedId - boardWidth, itemBeingDraggedId + 1, itemBeingDraggedId + boardWidth);
        }

        if (validMoves.includes(itemBeingReplacedId)) {
            return true;
        } else {
            return false;
        }
    };

    const dragStart = (e) => {
        setItemBeingDragged(e.target);
    };
    
    const touchDragEnd = (e) => {
        const endTarget = document.elementFromPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        setItemBeingReplaced(endTarget);
    };

    const mouseDrop = (e) => {
        setItemBeingReplaced(e.target);
    };

    const values = {
        gameTypesList,
        boardArrangement,
        createBoard,
        checkForColumnOf,
        checkForRowOf,
        moveDownAndRefill,
        dragStart,
        touchDragEnd,
        mouseDrop
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