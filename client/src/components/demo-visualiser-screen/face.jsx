import React from 'react';

const Face = (props) => {
  const {
    src, name, personSeen, id, currentPersons,
  } = props;
  let imgClass = 'face';
  if (personSeen) {
    imgClass += ' filtered';
  }
  if (currentPersons) {
    if (currentPersons.includes(id)) {
      imgClass += ' selected';
    }
  }

  return (
    <div className="person-container">
      <img className={imgClass} src={src} alt="Missing person" />
      {name}
    </div>
  );
};

export default Face;
