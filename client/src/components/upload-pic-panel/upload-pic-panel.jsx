import React from 'react';
import './upload-pic-panel.scss';

import PropTypes from 'prop-types';

const UploadPicPanel = (props) => {
  const { moveOn } = props;
  return (
    <div data-cy="upload-pic-panel">
      <PictureButton onClick={moveOn} src="photo.svg" className="pictureButton" dataCy="picture-button" />
      <PictureButton onClick={moveOn} src="no-photo.svg" className="pictureButton" dataCy="no-picture-button" />
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

UploadPicPanel.defaultProps = {
  moveOn: () => console.log('moveOn prop not found'),
};

UploadPicPanel.propTypes = {
  moveOn: PropTypes.func,
};

PictureButton.defaultProps = {
  onClick: () => console.log('onClick prop not found'),
  src: '',
  dataCy: '',
};

PictureButton.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string,
  dataCy: PropTypes.string,
};

export default UploadPicPanel;
