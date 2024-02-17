import { createContext, useContext, useState } from "react";

export interface Key {
  name: string;
  password: string;
}

/**
 * KeyContextType
 * 
 */
export interface KeyContextType {
  key: Key;
  hasKey: boolean;
  updateKey: (key: Key) => void;
}

const KeyContext = createContext<KeyContextType>(null!);
export const useKey = () => useContext(KeyContext);

/**
 * KeyContextProvider
 * 
 * @param children 
 * @returns KeyContextProvider
 */
export const KeyContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [key, setKey] = useState<Key>(() => {
    const localKey = localStorage.getItem("Key");
    return localKey ? JSON.parse(localKey) : undefined;
  });

  /**
   * Updates the Key.
   * 
   */
  const updateKey = (key: Key) => {
    setKey(key);
    localStorage.setItem("Key", JSON.stringify(key));
  };

  let value = {
    key,
    hasKey: !!key,
    updateKey
  };

  return <KeyContext.Provider value={value}>{children}</KeyContext.Provider>;
}
