import React from 'react';
import { observer } from 'mobx-react-lite';
import Image from './Image/Image';
import Audio from './Audio';
import Video from './Video/Video';

type Props = {
  file: {
    url: string,
    mimetype: string,
  }
};

function Content({ file }: Props) {
  if (file.mimetype?.includes('image')) {
    return (
      <Image src={file.url} />
    );
  }

  if (file.mimetype?.includes('audio')) {
    return (
      <Audio src={file.url} />
    );
  }

  if (file.mimetype?.includes('video')) {
    return (
      <Video src={file.url} />
    );
  }

  return null;
}

export default observer(Content);
