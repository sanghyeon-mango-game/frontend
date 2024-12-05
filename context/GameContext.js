import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [clickCount, setClickCount] = useState(0);
  const [trees, setTrees] = useState([]);
  const [collectedMangos, setCollectedMangos] = useState([]);

  const incrementClickCount = () => {
    setClickCount(prev => prev + 1);
  };

  const updateTrees = (newTrees) => {
    setTrees(newTrees);
  };

  const addMango = (newMango) => {
    setCollectedMangos(prev => {
      const existingMango = prev.find(mango => mango.id === newMango.id);
      if (existingMango) {
        return prev.map(mango =>
          mango.id === newMango.id
            ? { ...mango, count: mango.count + 1 }
            : mango
        );
      }
      return [...prev, { ...newMango, count: 1 }];
    });
  };

  return (
    <GameContext.Provider
      value={{
        clickCount,
        incrementClickCount,
        trees,
        updateTrees,
        treeCount: trees.length,
        collectedMangos,
        addMango
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}