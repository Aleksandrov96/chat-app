import { StoresContext } from 'context/StoresContext';
import React, { useContext, useEffect } from 'react';
import { ChatService } from 'services/chat-service';

export function useReadMessages(messagesIDs: string[]): void {
  const { chatStore } = useContext(StoresContext);

  useEffect(() => {
    let timeout;
    clearTimeout(timeout);
    if (messagesIDs.length === 0) {
      return;
    }
    timeout = setTimeout(async () => {
      await ChatService.changeMessagesStatus(messagesIDs);
    }, 1000);
    messagesIDs.map((id) => chatStore?.filterUnviewedMessages(id));
  }, [messagesIDs]);
}
