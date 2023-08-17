import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'hooks/useTheme';

type Props = {
  closeChatInfo: () => void,
};

export default function CloseChatInfoButton({ closeChatInfo }: Props) {
  const { onThemeChange } = useTheme();

  return (
    <button
      type="button"
      className={onThemeChange('closeChatInfo')}
      onClick={closeChatInfo}
      aria-label="close-chat-info-button"
    >
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
}
