import React, { createContext, useContext, useState } from "react";

const AvatarContext = createContext();

export function AvatarProvider({ children }) {
  const [selectedAvatar, setSelectedAvatar] = useState("female");

  return (
    <AvatarContext.Provider value={{ selectedAvatar, setSelectedAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  return useContext(AvatarContext);
}
