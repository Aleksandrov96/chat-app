import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { StoresContext } from 'context/StoresContext';
import Message from 'components/Chat/Messages/Message';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { IMessage } from 'interfaces/IMessage';
import { useUnviewedMessages } from 'hooks/useUnviewedMessages';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { useReadMessages } from 'hooks/useReadMessages';
import { useLazyMessagesLoading } from 'hooks/useLazyMessagesLoading';
import { Loader } from 'components/common/Loader/Loader';
import { useTheme } from 'hooks/useTheme';
import ScrollToBottomButton from '../../common/Buttons/ScrollToBottomButton/ScrollToBottomButton';
import './messages.scss';

function Messages() {
  const { chatStore } = useContext(StoresContext);

  const unviewedMessageRefs = useRef<HTMLDivElement[]>([]);
  const lastMessageRefOfUploaded = useRef<HTMLDivElement | null>(null);

  const { chatUnviewedMessages } = useUnviewedMessages(chatStore?.currentChatroom._id as string);
  const { onThemeChange } = useTheme();
  const { messagesIDs, shouldCleanup } = useIntersectionObserver(unviewedMessageRefs);

  const [skipRange, setSkipRange] = useState<number>(0);

  const { loading } = useLazyMessagesLoading(skipRange, chatUnviewedMessages?.length);

  useReadMessages(messagesIDs);

  const addLine = (firstUnviwedMessageElement: HTMLDivElement | undefined): void => {
    const isLineAdded = unviewedMessageRefs.current.some((el) => el.classList.contains('unviewed'));

    if (!isLineAdded) {
      firstUnviwedMessageElement?.classList.add('unviewed');
    }
  };

  const onChatUnviwedMessages = (): void => {
    if (chatUnviewedMessages?.length === 0) {
      lastMessageRefOfUploaded.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const firstUnviwedMessageElement = unviewedMessageRefs.current
        .find((element) => element.getAttribute('data-message-id') === chatUnviewedMessages?.[0]._id);

      addLine(firstUnviwedMessageElement);

      if (firstUnviwedMessageElement?.classList.contains('unviewed')) {
        firstUnviwedMessageElement?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
      }
    }
  };

  const addUnviewedMessageRef = (element: HTMLDivElement): void => {
    if (element && !unviewedMessageRefs.current?.includes(element)) {
      chatUnviewedMessages?.forEach((msg) => {
        if (msg._id === element.getAttribute('data-message-id')) {
          unviewedMessageRefs.current?.push(element);
        }
      });
    }
  };

  const handleScroll = (e: any) => {
    const messagesContainer = document.querySelector('.messages');
    const hasScrollbar = messagesContainer!.scrollHeight > messagesContainer!.clientHeight;

    if (hasScrollbar && e.target.scrollTop === 0 && chatStore?.currentChatMessages) {
      setSkipRange(chatStore?.currentChatMessages.length);
    }
  };

  useEffect(() => {
    onChatUnviwedMessages();
    if (shouldCleanup) {
      unviewedMessageRefs.current = [];
    }
  }, [chatStore?.currentChatMessages, chatStore?.currentChatroom, chatUnviewedMessages]);

  return (
    <div className={onThemeChange('messages')} data-testid="messages-container" onScroll={handleScroll}>
      {loading && <Loader />}
      {
          toJS(chatStore?.currentChatMessages as IMessage[]).map((message: IMessage) => (
            <div
              key={message._id}
              ref={chatUnviewedMessages?.length !== 0
                ? addUnviewedMessageRef : lastMessageRefOfUploaded}
              data-message-id={message._id}
            >
              <Message message={message} />
            </div>
          ))
        }
      <ScrollToBottomButton
        count={chatUnviewedMessages?.length as number}
      />
    </div>
  );
}

export default observer(Messages);
