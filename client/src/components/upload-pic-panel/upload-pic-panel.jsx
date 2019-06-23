import React from 'react';
import './upload-pic-panel.scss';

import PropTypes from 'prop-types';

const UploadPicPanel = (props) => {
  const { uploadPic, moveOn } = props;
  return (
    <div data-cy="upload-pic-panel">
      <PictureButton onClick={moveOn} src="camera.svg" className="pictureButton" dataCy="picture-button" />
      <PictureButton onClick={moveOn} src="no-photo.png" className="pictureButton" dataCy="no-picture-button" />
    </div>
  );
};

const PictureButton = (props) => {
  const {
    onClick, src, dataCy,
  } = props;
  return (
    <img onClick={onClick} src={src} alt="" className="pictureButton" data-cy={dataCy} />
  );
};

export default UploadPicPanel;
