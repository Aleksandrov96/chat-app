import { useContext, useMemo } from 'react';
import { StoresContext } from 'context/StoresContext';
import { IMessage } from 'interfaces/IMessage';

export function useUnviewedMessages(chatroomId: string): {
  chatUnviewedMessages: IMessage[] | undefined;
} {
  const { chatStore } = useContext(StoresContext);

  const filterMessages = () => {
    const unviewedMessages = chatStore?.unviewedMessages.filter(
      (message) => message.chatroom._id === chatroomId,
    );
    return unviewedMessages;
  };

  const chatUnviewedMessages = useMemo(() => filterMessages(), [chatStore?.unviewedMessages]);

  return { chatUnviewedMessages };
}
