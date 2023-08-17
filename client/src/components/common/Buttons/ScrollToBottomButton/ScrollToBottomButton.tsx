import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import { StoresContext } from 'context/StoresContext';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'hooks/useTheme';
import './scrollToBottomButton.scss';

type Props = {
  count: number;
};

function ScrollToBottomButton({ count }: Props) {
  const { chatStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();

  const [visible, setVisible] = useState<boolean>(true);

  const hoverRef = useRef<boolean>(false);

  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');

    const hasScrollbar = messagesContainer!.scrollHeight > messagesContainer!.clientHeight;

    let timer: number | NodeJS.Timeout | undefined;

    const scrollListener = (): void => {
      if (timer) {
        clearTimeout(timer);
        setVisible(true);
      }

      timer = setTimeout(() => {
        if (!hoverRef.current) {
          setVisible(false);
        }
      }, 5000);
    };

    if (!hasScrollbar) {
      setVisible(false);
    }

    messagesContainer?.addEventListener('scroll', scrollListener);

    return () => {
      messagesContainer?.removeEventListener('scroll', scrollListener);
    };
  }, [count, hoverRef.current, chatStore?.currentChatMessages]);

  const scrollToBottom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const messages = document.querySelectorAll('.message');
    if (messages) {
      messages[messages.length - 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (): void => {
    hoverRef.current = true;
  };

  const handleMouseLeave = (): void => {
    setVisible(false);
    hoverRef.current = false;
  };

  return (
    <div>
      {
        visible
        && (
        <button
          type="button"
          className={onThemeChange('scrollToBottom')}
          aria-hidden="true"
          onClick={scrollToBottom}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="scroll-to-bottom"
        >
          {
            count !== 0
            && <div className={onThemeChange('count')}>{count}</div>
          }
          <div className="scrollToBottom__icon">
            <FontAwesomeIcon icon={faArrowDownLong} />
          </div>
        </button>
        )
      }
    </div>
  );
}

export default observer(ScrollToBottomButton);
