import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Button from 'mineral-ui/Button';
import { PoseGroup } from 'react-pose';

import IconCancel from 'mineral-ui-icons/IconCancel';
import apiRequests from '../../utils/apiRequests';

import Face from './face';
import { origin } from '../../config';
import { FaceItem, UserItem } from '../animations/list-animations';
import './demo-visualiser-screen.scss';

const socket = socketIOClient(origin);

const getPersonsInNameOrder = async () => {
  const persons = await apiRequests.getPersonsWithNFeatures();
  return persons.sort((person1, person2) => (person1.name > person2.name ? 1 : -1));
};

const DemoVisualiser = () => {
  const [rankedPersons, setRankedPersons] = useState({});
  const [currentPersons, setCurrentPersons] = useState({});
  const [showGraphs, setShowGraphs] = useState(false);
  const [users, setUsers] = useState([]);
  const [personsSortedByName, setPersonsSortedByName] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  const removeUser = (username) => {
    const newUsers = [...users];
    const newRankedPersons = { ...rankedPersons };
    delete newRankedPersons[username];
    const index = newUsers.indexOf(username);
    if (index > -1) {
      newUsers.splice(index, 1);
    }
    setRankedPersons(newRankedPersons);
    setUsers(newUsers);
  };

  useEffect(() => {
    async function fetchPersons() {
      try {
        const initialPersons = await getPersonsInNameOrder();
        setPersonsSortedByName(initialPersons);
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
              showGraphs={showGraphs}
            />
          </FaceItem>
        ))}
      </PoseGroup>
    </ul>
  ) : (
    <ul id="#menu">
      <PoseGroup>
        {personsSortedByName.map(person => (
          <FaceItem key={person.name}>
            <Face
              key={person.name}
              id={person._id}
              src={`${origin}${person.img_url}`}
              name={person.name}
              showGraphs={showGraphs}
            />
          </FaceItem>
        ))}
      </PoseGroup>
    </ul>
  );

  const showGraphsButton = (
    <ul id="#menu">
      <PoseGroup>
        <UserItem key="open-graphs">
          <button type="button" className="show-graphs-button" onClick={() => setShowGraphs(!showGraphs)}>
            {showGraphs ? 'Remove Graphs' : 'Show Graphs'}
          </button>
        </UserItem>
      </PoseGroup>
    </ul>
  );

  return (
    <div className="demo-visualiser-screen">
      {userMenu}
      {showGraphsButton}
      {faces}
    </div>
  );
};

export default DemoVisualiser;
