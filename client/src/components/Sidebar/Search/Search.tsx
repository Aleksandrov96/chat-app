import React, { useEffect, useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { observer } from 'mobx-react-lite';
import { setToastError } from 'utils/setToastError';
import { throttle } from 'utils/throttle';
import { useIntl } from 'react-intl';
import { useTheme } from 'hooks/useTheme';
import './search.scss';

function Search() {
  const { chatStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();
  const intl = useIntl();

  useEffect(() => {
    const searchUsers = async () => {
      throttle(async () => {
        await chatStore?.searchUsers(chatStore?.searchValue);
      }, 1000);
    };
    searchUsers()
      .catch((e) => setToastError(e.message as string));
  }, [chatStore?.searchValue]);

  const onChangeHadler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    chatStore?.setSearchValue(e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        className={onThemeChange('search')}
        placeholder={intl.formatMessage({ id: 'search-placeholder' })}
        value={chatStore?.searchValue}
        onChange={onChangeHadler}
      />
    </div>
  );
}

export default observer(Search);
