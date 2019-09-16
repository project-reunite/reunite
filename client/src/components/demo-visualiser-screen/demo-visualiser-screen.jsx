import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import posed, { PoseGroup } from 'react-pose';
import { origin } from '../../config';
import './demo-visualiser-screen.scss';

const Item = posed.li({
  flip: {
    scale: 1,
    transition: {
      duration: 1000,
    },
  },
});

const Face = (props) => {
  const {
    src, name, personSeen, id, currentPersons,
  } = props;
  console.log(currentPersons);
  console.log(id);
  let imgClass = 'face';
  if (personSeen) {
    imgClass += ' filtered';
  }
  if (currentPersons.includes(id)) {
    imgClass += ' selected';
    console.log(name);
  }

  return (
    <div className="person-container">
      <img className={imgClass} src={src} alt="Missing person" />
      {name}
    </div>
  );
};

const DemoVisualiser = () => {
  const [rankedPersons, setRankedPersons] = useState([]);
  const [currentPersons, setCurrentPersons] = useState([]);

  useEffect(() => {
    function fetchNewOrder() {
      try {
        const socket = socketIOClient(origin);
        socket.on('rankedPersons', (data) => {
          console.log(data.curre);
          setCurrentPersons(data.currentPersons);
          setRankedPersons(data.rankedPersons);
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchNewOrder();
  }, []);

  const faces = (
    <ul id="#menu">
      <PoseGroup>
        {rankedPersons.map(person => (
          <Item key={person.name}>
            <Face
              key={person.name}
              id={person._id}
              src={`${origin}${person.img_url}`}
              name={person.name}
              personSeen={person.personSeen}
              currentPersons={currentPersons}
            />
          </Item>
        ))}
      </PoseGroup>
    </ul>
  );

  return <div className="demo-visualiser-screen">{faces}</div>;
};

export default DemoVisualiser;
