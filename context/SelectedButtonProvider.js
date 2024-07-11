import React, { createContext, useState, useContext } from "react";

const SelectedButtonContext = createContext();

export const SelectedButtonProvider = ({ children }) => {
  const [selectedGameMode, setSelectedGameMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <SelectedButtonContext.Provider
      value={{ selectedGameMode, setSelectedGameMode, selectedCategory, setSelectedCategory }}
    >
      {children}
    </SelectedButtonContext.Provider>
  );
};

export const useSelectedButton = () => useContext(SelectedButtonContext);
