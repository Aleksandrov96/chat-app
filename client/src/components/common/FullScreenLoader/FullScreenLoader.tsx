import React from 'react';
import ReactDom from 'react-dom';
import './loadingio.scss';
import './fullScreenLoader.scss';

function FullScreenLoader() {
  const portal = document.getElementById('portal') as HTMLElement;

  const ModalElement = (
    <div className="fullScreenLoader" data-testid="full-screen-loader">
      <div className="loadingio-spinner-ellipsis-7z8i3thrd3u">
        <div className="ldio-uqv5rie73d">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
  return ReactDom.createPortal(ModalElement, portal);
}

export default FullScreenLoader;
