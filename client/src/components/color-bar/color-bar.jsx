import React from 'react';
import './color-bar.scss';

const ColorBar = () => (
  <div className="colorbar-container">
    <div className="colorbar" />
    <div className="labels">
      <div className="upper-label">
      100%
      </div>
      <div className="lower-label">
      0%
      </div>
    </div>
    <div className="colorbar-title">
      <h3>
        Feature
      </h3>
      <h3>
        Confidence
      </h3>
    </div>
  </div>
);

ColorBar.propTypes = {

};

export default ColorBar;
