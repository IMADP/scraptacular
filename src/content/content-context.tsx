import { createContext, useContext, useState } from "react";

/**
 * ContentContextType
 * 
 */
export interface ContentContextType {
  content: string;
  hasContent: boolean;
  setContent: (content: string) => void;
}

const ContentContext = createContext<ContentContextType>(null!);
export const useContent = () => useContext(ContentContext);

/**
 * ContentContextProvider
 * 
 * @param children 
 * @returns ContentContextProvider
 */
export const ContentContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<string>('');

  let value = {
    content,
    hasContent: !!content,
    setContent
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
