import { createContext, useContext, useEffect, useState } from "react";
import gameTypes from "../data/gameTypes.json";
import { GoldenSnitch, HogwartsShield, MaraudersMap, Owl, SortingHat, TimeTurner, Wand, Blank } from "../assets/icons";

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
    

    // STATES

    const [boardArrangement, setBoardArrangement] = useState([]);
    const [itemBeingDragged, setItemBeingDragged] = useState(null);
    const [itemBeingReplaced, setItemBeingReplaced] = useState(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        localStorage.getItem('highScore')
            ? JSON.parse(localStorage.getItem('highScore'))
            : {}
    );
    const [highScoreCreated, setHighScoreCreated] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [newGame, setNewGame] = useState(false);

    
    // USEEFFECT HOOKS

    // Sets high score in local storage when the createHighScore function is done
    useEffect(() => {
        if (highScoreCreated) {
            localStorage.setItem('highScore', JSON.stringify(highScore));
            setHighScoreCreated(false);
            setGameOver(false);
        }
    }, [highScoreCreated]);

    // Switches two items when one is dragged to another
    // If it's a valid move and it makes a match the items stays switched
    // If it's not a valid move or it doesn't make a match the items are switched back to their original positions
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


    // GAME PLAY FUNCTIONS
    
    // Creates a random list of items according to the difficulty level and sets it to the boardArrangement which is output in the DOM
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
    
    // Checks for columns of which ever number is sent in with it, in a for loop
    // If every item in a column being checked is the same (and it's not a blank space) the score is updated and each item in the column is replaced by a blank space
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
                setScore(prevScore => prevScore + (amountOfItems === 3 ? 1 : amountOfItems === 4 ? 3 : 5));
                column.forEach(item => boardArrangement[item] = Blank);
                setBoardArrangement([...boardArrangement]);
                return true;
            }
        }
    };

    // Checks for rows of which ever number is sent in with it, in a for loop
    // If every item in a row being checked is the same (and it's not a blank space) the score is updated and each item in the row is replaced by a blank space
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
                setScore(prevScore => prevScore + (amountOfItems === 3 ? 1 : amountOfItems === 4 ? 3 : 5));
                row.forEach(item => boardArrangement[item] = Blank);
                setBoardArrangement([...boardArrangement]);
                return true;
            }
        }
    };

    // Moves the items down and refills new ones according to the difficulty level
    // For loop is used to check the board for blank spaces
    // If there is a blank space in the first row it will be replaced with a new random item
    // If there is a blank space below the one being iterated, that item will switch places with the blank space
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

    // Checks for valid moves of the item being dragged and the one being replaced
    // It first determines if the item being dragged is in the first or last column of the board to prevent switches being made between the two
    // Valid moves are pushed to an array and if the id of the item being replaced is in the array, the item being dragged is allowed to move there
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
    

    // DRAG FUNCTIONS

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


    // START AND END FUNCTIONS

    const startGame = () => {
        setScore(0)
        setNewGame(true);
        setGameOver(false);
    };
    
    const endGame = () => {
        setGameOver(true);
        setNewGame(false);
    }


    // HIGH SCORE FUNCTION

    // Sets high score to the right difficulty level
    const createHighScore = (gameType, newHighScore) => {
        if (gameType === "easy") {
            setHighScore({...highScore, easy: newHighScore});
            setHighScoreCreated(true);
        } else if (gameType === "medium") {
            setHighScore({...highScore, medium: newHighScore});
            setHighScoreCreated(true);
        } else {
            setHighScore({...highScore, difficult: newHighScore});
            setHighScoreCreated(true);
        }
    };

    const values = {
        gameTypesList,
        boardArrangement,
        score,
        highScore,
        gameOver,
        newGame,
        createBoard,
        checkForColumnOf,
        checkForRowOf,
        moveDownAndRefill,
        dragStart,
        touchDragEnd,
        mouseDrop,
        createHighScore,
        startGame,
        endGame
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