import React, { createContext, useState, useContext } from "react";

const SelectedButtonContext = createContext();

export const SelectedButtonProvider = ({ children }) => {
  const [selectedGameMode, setSelectedGameMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState('female');

  return (
    <SelectedButtonContext.Provider
      value={{
        selectedGameMode,
        setSelectedGameMode,
        selectedCategory,
        setSelectedCategory,
        selectedAvatar,
        setSelectedAvatar,
      }}
    >
      {children}
    </SelectedButtonContext.Provider>
  );
};

export const useSelectedButton = () => useContext(SelectedButtonContext);
