import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { observer } from 'mobx-react-lite';
import { IMessage } from 'interfaces/IMessage';
import { FormattedTime } from 'react-intl';
import { useTheme } from 'hooks/useTheme';
import Content from '../../common/Content/Content';
import './messages.scss';

type Props = {
  message: IMessage;
};

function Message({ message }: Props) {
  const { authStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();

  return (
    <div
      className={message.sender._id === authStore?.user._id ? 'message owner' : 'message'}
      data-testid="message"
    >
      <div className={onThemeChange('messageInfo')}>
        <img
          src={message.sender.picture}
          alt="Avatar"
          className={onThemeChange('messageInfo__avatar')}
        />
        <p
          className={onThemeChange('messageInfo__time')}
        >
          {message?.createdAt
            && (
            <FormattedTime
              value={message.createdAt}
            />
            )}
        </p>
      </div>
      <div className="messageContent">
        <p className="messageContent__text">{message.content}</p>
        {message.files && (
        <Content file={message.files?.[0]} />
        )}
      </div>
    </div>
  );
}

export default observer(Message);
