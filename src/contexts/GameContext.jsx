import { createContext, useContext } from "react";

const GameContext = createContext();

const useGameContext = () => {
    return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
    const gameTypes = [
        {
            label: "easy",
            description: "This is the easiest game type. Choose this for a more relaxed game.",
            gameTypeClass: "game-type-easy"
        },
        {
            label: "medium",
            description: "This game typ is not easy, but not too difficult. Choose this to up your skills.",
            gameTypeClass: "game-type-medium"
        },
        {
            label: "difficult",
            description: "This is the most difficult game type. Choose this for a challenge.",
            gameTypeClass: "game-type-difficult"
        },
    ];

    const values = {
        gameTypes,
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