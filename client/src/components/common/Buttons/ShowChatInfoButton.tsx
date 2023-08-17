import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'hooks/useTheme';

type Props = {
  showChatInfo: () => void,
};

export default function ShowChatInfoButton({ showChatInfo }: Props) {
  const { onThemeChange } = useTheme();

  return (
    <button
      type="button"
      className={onThemeChange('showInfo')}
      onClick={showChatInfo}
      aria-label="show-chat-info-button"
    >
      <FontAwesomeIcon icon={faEllipsisVertical} />
    </button>
  );
}
