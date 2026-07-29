import React, { createContext, useContext, useState } from 'react';
import defaultContent from '../data/content.json';

const ContentContext = createContext();

export function ContentProvider({ children, value }) {
  // If a value is provided (like in the Admin live preview), use it.
  // Otherwise, use the default content from the JSON file.
  const [content, setContent] = useState(value || defaultContent);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
