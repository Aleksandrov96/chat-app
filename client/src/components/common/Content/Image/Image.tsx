import React from 'react';
import { observer } from 'mobx-react-lite';
import corruptedFile from '../../../../assets/corrupted-file.png';
import './image.scss';

type Props = {
  src: string,
};

function Image({ src }: Props) {
  return (
    <img
      src={src}
      onError={(e) => {
        e.currentTarget.src = corruptedFile;
      }}
      alt="Content"
      className="attachedImage"
      data-testid="attached-image"
    />
  );
}

export default observer(Image);
