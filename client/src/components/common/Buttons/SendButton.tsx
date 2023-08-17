import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'hooks/useTheme';

type Props = {
  isValid: () => boolean,
};

export default function SendButton({ isValid }: Props) {
  const { onThemeChange } = useTheme();

  return (
    <button
      type="submit"
      className={onThemeChange('messageForm__icons-icon')}
      disabled={!isValid}
      aria-label="message-submit-button"
    >
      <FontAwesomeIcon
        icon={faPaperPlane}
        data-testid="message-send-icon"
      />
    </button>
  );
}
