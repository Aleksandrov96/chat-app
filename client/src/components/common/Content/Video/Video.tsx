import React from 'react';
import { observer } from 'mobx-react-lite';
import corruptedFile from '../../../../assets/corrupted-file.png';
import './video.scss';

type Props = {
  src: string,
};

function Video({ src }: Props) {
  return (
    <video
      src={src}
      onError={(e) => {
        e.currentTarget.src = corruptedFile;
      }}
      controls
      className="attachedVideo"
      data-testid="attached-video"
    >
      <track default kind="captions" />
    </video>
  );
}

export default observer(Video);
