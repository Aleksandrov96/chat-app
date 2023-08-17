import React, { useContext } from 'react';
import { LOCALES } from 'lang/locales';
import { StoresContext } from 'context/StoresContext';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'hooks/useTheme';
import './langSwitcher.scss';

const languages = [
  { flag: '🇬🇧', code: LOCALES.ENGLISH },
  { flag: '🇺🇦', code: LOCALES.UKRAINIAN },
];

function LangSwitcher() {
  const { uiStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();

  const setLocale = (e: { target: { value: string; }; }): void => {
    uiStore?.setLocale(e.target.value);
  };

  return (
    <select
      onChange={setLocale}
      className={onThemeChange('langSwitcher')}
      value={uiStore?.locale as string}
    >
      {languages.map(({ flag, code }) => (
        <option
          key={code}
          value={code}
          className={onThemeChange('langSwitcher__option')}
        >
          {flag}
        </option>
      ))}
    </select>
  );
}

export default observer(LangSwitcher);
