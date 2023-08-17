import React from 'react';
import './typingIndicator.scss';
import { useTheme } from 'hooks/useTheme';

export function TypingIndicator() {
  const { onThemeChange } = useTheme();

  return (
    <div className={onThemeChange('typingIndicator')} data-testid="typing-indicator">
      <div className={onThemeChange('dot-1')} />
      <div className={onThemeChange('dot-2')} />
      <div className={onThemeChange('dot-3')} />
    </div>
  );
}
