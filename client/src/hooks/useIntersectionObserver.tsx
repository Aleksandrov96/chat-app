import React, { useContext, useState, useEffect } from 'react';
import { StoresContext } from 'context/StoresContext';
import { useUnviewedMessages } from './useUnviewedMessages';

export function useIntersectionObserver(messagesRefs: React.MutableRefObject<HTMLDivElement[]>): {
  messagesIDs: string[];
  shouldCleanup: boolean;
} {
  const [messagesIDs, setMessagesIDs] = useState<string[]>([]);
  const [shouldCleanup, setShouldCleanup] = useState<boolean>(false);

  const { chatStore } = useContext(StoresContext);
  const { chatUnviewedMessages } = useUnviewedMessages(chatStore?.currentChatroom._id as string);

  useEffect(() => {
    if (chatUnviewedMessages?.length !== 0) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.map(async (entry) => {
          if (entry.target && entry.isIntersecting) {
            const messageId = entry.target.getAttribute('data-message-id');
            const unviewedMessage = chatUnviewedMessages?.find((msg) => msg._id === messageId);

            if (unviewedMessage) {
              intersectionObserver.unobserve(entry.target);
              setMessagesIDs((prev) => {
                if (!prev.includes(unviewedMessage._id)) {
                  return [...prev, unviewedMessage._id];
                }
                return [...prev];
              });
            }
          }
        });
      });
      messagesRefs.current.map((ref) => intersectionObserver?.observe(ref));
    } else {
      setShouldCleanup(true);
      setMessagesIDs([]);
    }
  }, [chatUnviewedMessages]);

  return { messagesIDs, shouldCleanup };
}
