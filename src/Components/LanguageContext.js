import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageSwitch = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, handleLanguageSwitch }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
