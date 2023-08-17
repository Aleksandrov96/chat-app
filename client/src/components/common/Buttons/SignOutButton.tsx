import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'hooks/useTheme';

type Props = {
  signOut: () => void,
};

export default function SignOutButton({ signOut }: Props) {
  const { onThemeChange } = useTheme();

  return (
    <button
      type="button"
      className={onThemeChange('signOut')}
      onClick={signOut}
      aria-label="signOut-button"
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
}
