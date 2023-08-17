import { StoresContext } from 'context/StoresContext';
import React, { useContext, useEffect } from 'react';

export function useCloseContextMenu(
  contextMenuRef: React.RefObject<HTMLDivElement>,
): void {
  const { chatStore } = useContext(StoresContext);

  useEffect(() => {
    const closeContextMenu = (): void => {
      if (contextMenuRef.current && chatStore?.showContextMenu) {
        chatStore.setShowContextMenu(false);
      }
    };

    document.body.addEventListener('click', closeContextMenu);

    return () => document.body.removeEventListener('click', closeContextMenu);
  }, []);
}
