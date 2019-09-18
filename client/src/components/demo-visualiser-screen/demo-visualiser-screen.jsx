import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import posed, { PoseGroup } from 'react-pose';
import apiRequests from '../../utils/apiRequests';

import Face from './face';
import { origin } from '../../config';
import './demo-visualiser-screen.scss';

const socket = socketIOClient(origin);

const Item = posed.li({
  flip: {
    scale: 1,
    transition: {
      duration: 2500,
    },
  },
});

const getUrls = async () => {
  const response = await apiRequests.getPersonUrls();
  const urls = response.data;
  return urls;
};

const SimpleFace = (props) => {
  const { src, name } = props;
  return (
    <div className="person-container">
      <img className="face" src={src} alt="Missing person" />
      {name}
    </div>
  );
};

const DemoVisualiser = () => {
  const [rankedPersons, setRankedPersons] = useState({});
  const [currentPersons, setCurrentPersons] = useState([]);
  const [users, setUsers] = useState([]);
  const [urls, setUrls] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    async function fetchUrls() {
      try {
        const newUrls = await getUrls();
        setUrls(newUrls);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUrls();
  }, []);

  useEffect(() => {
    socket.on('rankedPersons', (data) => {
      const newRankedPersons = { ...rankedPersons };
      newRankedPersons[data.username] = data.rankedPersons;
      setRankedPersons(newRankedPersons);
      setCurrentPersons(data.currentPersons);
    });
    return () => {
      socket.off('rankedPersons');
    };
  });

  useEffect(() => {
    socket.on('newUser', (username) => {
      const newUsers = users.concat(username);
      setUsers(newUsers);
    });
    return () => {
      socket.off('newUser');
    };
  });

  useEffect(() => {
    socket.on('removeUser', (username) => {
      const index = users.indexOf(username);
      if (index > -1) {
        users.splice(index, 1);
      }
    });
  });

  const userMenu = (
    <ul>
      <PoseGroup>
        {users.map(user => (
          <Item onClick={() => setCurrentUser(user)} key={user}>
            <button type="submit">{user}</button>
          </Item>
        ))}
      </PoseGroup>
    </ul>
  );

  const preSearchFaces = urls.map((url) => {
    const absoluteUrl = `${origin}${url}`;
    return <SimpleFace key={url} src={absoluteUrl} />;
  });

  const faces = rankedPersons[currentUser] ? (
    <ul id="#menu">
      <PoseGroup>
        {rankedPersons[currentUser].map(person => (
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
  ) : (
    <div className="awaiting-search">Awaiting search!</div>
  );
  //   (
  // <ul id="#menu">{preSearchFaces}</ul>
  // );

  return (
    <div className="demo-visualiser-screen">
      {userMenu}
      {faces}
    </div>
  );
};

export default DemoVisualiser;
