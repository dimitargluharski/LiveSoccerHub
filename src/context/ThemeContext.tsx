import { createContext, useEffect, useState } from "react";

type ContextProviderType = {
  children: React.ReactNode;
}

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider = ({ children }: ContextProviderType) => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('userTheme') || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('userTheme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const themeDictionary = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={themeDictionary}>
      {children}
    </ThemeContext.Provider>
  );
};