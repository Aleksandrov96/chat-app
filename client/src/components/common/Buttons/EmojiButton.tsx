import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'hooks/useTheme';

type Props = {
  onShowEmojiPicker: () => void,
};

export default function EmojiButton({ onShowEmojiPicker }: Props) {
  const { onThemeChange } = useTheme();

  return (
    <button
      type="button"
      className={onThemeChange('messageForm__icons-icon')}
      onClick={onShowEmojiPicker}
      aria-label="emoji-button"
    >
      <FontAwesomeIcon icon={faSmile} />
    </button>
  );
}
