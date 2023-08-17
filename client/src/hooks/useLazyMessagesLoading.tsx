import React, { useEffect, useState, useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { setToastError } from 'utils/setToastError';

export function useLazyMessagesLoading(skipRange: number, limit?: number): {
  loading: boolean;
} {
  const [loading, setLoading] = useState<boolean>(false);

  const { chatStore } = useContext(StoresContext);

  useEffect(() => {
    setLoading(true);
    const fetchChatMessages = async () => {
      await chatStore?.fetchChatMessages(chatStore.currentChatroom._id, skipRange, limit);
    };

    fetchChatMessages()
      .then(() => setLoading(false))
      .catch((e) => setToastError(e.message as string));
  }, [skipRange, chatStore?.currentChatroom]);

  return { loading };
}
