import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'hooks/useTheme';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './themeSwitcher.scss';

function ThemeSwitcher() {
  const { uiStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();

  const setTheme = () => {
    if (uiStore?.theme === 'light') {
      uiStore?.setTheme('dark');
    } else {
      uiStore?.setTheme('light');
    }
  };

  return (
    <button
      type="button"
      onClick={setTheme}
      className={onThemeChange('themeSwitcher')}
      aria-label="switch-theme-button"
    >
      {uiStore?.theme === 'light' ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
    </button>
  );
}

export default observer(ThemeSwitcher);
