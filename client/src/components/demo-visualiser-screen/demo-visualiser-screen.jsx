import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import posed, { PoseGroup } from 'react-pose';
import Button from 'mineral-ui/Button';

import IconCancel from 'mineral-ui-icons/IconCancel';
import apiRequests from '../../utils/apiRequests';

import Face from './face';
import { origin } from '../../config';
import './demo-visualiser-screen.scss';

const socket = socketIOClient(origin);

const FaceItem = posed.li({
  flip: {
    scale: 1,
    transition: {
      delay: 500,
      duration: 2500,
    },
  },
});

const UserItem = posed.li({
  flip: {
    scale: 1,
    transition: {
      duration: 1000,
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

  const removeUser = (username) => {
    const newUsers = [...users];
    const index = newUsers.indexOf(username);
    if (index > -1) {
      newUsers.splice(index, 1);
    }
    setUsers(newUsers);
  };

  useEffect(() => {
    socket.on('removeUser', (username) => {
      removeUser(username);
    });
    return () => {
      socket.off('removeUser');
    };
  });

  const userMenu = (
    <ul>
      <PoseGroup>
        {users.map(user => (
          <UserItem onClick={() => setCurrentUser(user)} key={user}>
            <div>
              <Button
                className="remove-user-button"
                onClick={() => removeUser(user)}
                iconStart={<IconCancel className="cancel-icon" />}
              />
              {user === currentUser ? (
                <button className="user-button selected-button" type="submit">
                  {user}
                </button>
              ) : (
                <button className="user-button " type="submit">
                  {user}
                </button>
              )}
            </div>
          </UserItem>
        ))}
      </PoseGroup>
    </ul>
  );

  const faces = rankedPersons[currentUser] ? (
    <ul id="#menu">
      <PoseGroup>
        {rankedPersons[currentUser].map(person => (
          <FaceItem key={person.name}>
            <Face
              key={person.name}
              id={person._id}
              src={`${origin}${person.img_url}`}
              name={person.name}
              personSeen={person.personSeen}
              currentPersons={currentPersons[currentUser]}
            />
          </FaceItem>
        ))}
      </PoseGroup>
    </ul>
  ) : (
    <ul id="#menu">
      <PoseGroup>
        {persons.map(person => (
          <FaceItem key={person.name}>
            <Face
              key={person.name}
              id={person._id}
              src={`${origin}${person.img_url}`}
              name={person.name}
            />
          </FaceItem>
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
