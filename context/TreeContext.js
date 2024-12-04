import React, { createContext, useState, useContext } from 'react';

const TreeContext = createContext();

export function TreeProvider({ children }) {
  const [selectedTree, setSelectedTree] = useState({
    id: 'default',
    image: require('../assets/images/tree.png')
  });

  return (
    <TreeContext.Provider value={{ selectedTree, setSelectedTree }}>
      {children}
    </TreeContext.Provider>
  );
}

export function useTree() {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error('useTree must be used within a TreeProvider');
  }
  return context;
}