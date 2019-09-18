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

const getPersonsInNameOrder = async () => {
  const persons = await apiRequests.getPersonsWithNFeatures();
  const personsInNameOrder = persons.sort((person1, person2) => person1.name > person2.name);
  return personsInNameOrder;
};

const DemoVisualiser = () => {
  const [rankedPersons, setRankedPersons] = useState({});
  const [currentPersons, setCurrentPersons] = useState({});
  const [users, setUsers] = useState([]);
  const [persons, setPersons] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    async function fetchPersons() {
      try {
        const initialPersons = await getPersonsInNameOrder();
        setPersons(initialPersons);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPersons();
  }, []);

  useEffect(() => {
    socket.on('rankedPersons', (data) => {
      const newRankedPersons = { ...rankedPersons };
      const newCurrentPersons = { ...currentPersons };
      newRankedPersons[data.username] = data.rankedPersons;
      newCurrentPersons[data.username] = data.currentPersons;
      setRankedPersons(newRankedPersons);
      setCurrentPersons(newCurrentPersons);
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
    return () => {
      socket.off('removeUser');
    };
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
              currentPersons={currentPersons[currentUser]}
            />
          </Item>
        ))}
      </PoseGroup>
    </ul>
  ) : (
    <ul id="#menu">
      <PoseGroup>
        {persons.map(person => (
          <Item key={person.name}>
            <Face
              key={person.name}
              id={person._id}
              src={`${origin}${person.img_url}`}
              name={person.name}
            />
          </Item>
        ))}
      </PoseGroup>
    </ul>
  );

  return (
    <div className="demo-visualiser-screen">
      {userMenu}
      {faces}
    </div>
  );
};

export default DemoVisualiser;
