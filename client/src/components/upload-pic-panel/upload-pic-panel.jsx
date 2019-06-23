import React from 'react';
import './upload-pic-panel.scss';

import PropTypes from 'prop-types';
import Grid, { GridItem } from 'mineral-ui/Grid';

const UploadPicPanel = (props) => {
  const { moveOn } = props;
  return (
    <div className="uploadPicPanel" data-cy="upload-pic-panel">
      <Grid>
        <GridItem>
          <PictureButton onClick={moveOn} src="photo.svg" className="pictureButton" dataCy="picture-button" />
          <h1>I have a photo</h1>
        </GridItem>
        <GridItem>
          <PictureButton onClick={moveOn} src="no-photo.svg" className="pictureButton" dataCy="no-picture-button" />
          <h1>I don&apos;t have a photo</h1>
        </GridItem>
      </Grid>
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
