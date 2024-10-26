// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

export const theme = {
  light: {
    background: '#f5f5f5',
    text: '#333',
    subText: '#5B5B5B',
    shadow: '#000',
    divider: '#EEEEEE',
    score: '#FFD000',
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    subText: '#BBBBBB',
    shadow: '#ffffff',
    divider: '#333333',
    score: '#FFD000',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);