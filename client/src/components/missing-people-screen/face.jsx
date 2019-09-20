import React from 'react';
import PropTypes from 'prop-types';

const Face = (props) => {
  const { src, name } = props;
  return (
    <div className="person-container">
      <img className="face" src={src} alt={name} />
      {name}
    </div>
  );
};

Face.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.number.isRequired,
};

export default Face;
