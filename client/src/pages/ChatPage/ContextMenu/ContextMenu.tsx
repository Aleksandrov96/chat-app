import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import './contextMenu.scss';

export function ContextMenu() {
  const { chatStore } = useContext(StoresContext);

  return (
    <div
      className="contextMenu"
      style={{ top: chatStore?.anchorPoint.y, left: chatStore?.anchorPoint.x }}
    >
      <div className="contextMenu__item">
        <FontAwesomeIcon icon={faTrashCan} />
        <FormattedMessage id="context-menu-delete-chat" values={{ option: 'Delete chat' }} />
      </div>
    </div>
  );
}
