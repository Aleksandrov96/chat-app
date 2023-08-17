import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';

export function useTheme(): {
  onThemeChange: (className: string) => string;
} {
  const { uiStore } = useContext(StoresContext);

  const onThemeChange = (className: string) => {
    if (uiStore?.theme === 'light') {
      return className;
    }
    return `${className} dark`;
  };

  return { onThemeChange };
}
