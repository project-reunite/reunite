import React from 'react';
import './upload-pic-panel.scss';

const UploadPicPanel = (props) =>{
  const { uploadPic, moveOn } = props;
  return (
    <div data-cy="welcomePanel">
      <PictureButton onClick={moveOn} src='camera.svg' className="pictureButton"/>
      <PictureButton onClick={moveOn} src='camera.svg' className="pictureButton"/>
    </div>
  );
}
 
const PictureButton = (props) => {
  const { onClick, src, className } = props;
  return (
  <img onClick={onClick} src={src} alt="" className={className} />
)}

export default UploadPicPanel;
