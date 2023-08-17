import React from 'react';
import { observer } from 'mobx-react-lite';
import corruptedFile from '../../../assets/corrupted-file.png';

type Props = {
  src: string,
};

function Audio({ src }: Props) {
  return (
    <audio
      src={src}
      onError={(e) => {
        e.currentTarget.src = corruptedFile;
      }}
      controls
      data-testid="attached-audio"
    >
      <track default kind="captions" />
    </audio>
  );
}

export default observer(Audio);
