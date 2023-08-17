import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'hooks/useTheme';

type Props = {
  deleteAttachedFile: () => void,
};

export default function DeleteAttachedButton({ deleteAttachedFile }: Props) {
  const { onThemeChange } = useTheme();

  return (
    <button
      type="button"
      className={onThemeChange('item-delete')}
      onClick={deleteAttachedFile}
      aria-label="delete-attached-file-button"
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}
