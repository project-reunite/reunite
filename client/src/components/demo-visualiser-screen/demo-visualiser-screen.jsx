import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import posed, { PoseGroup } from 'react-pose';
import Face from './face';
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

const DemoVisualiser = () => {
  const [rankedPersons, setRankedPersons] = useState([]);
  const [currentPersons, setCurrentPersons] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    function fetchNewOrder() {
      try {
        const socket = socketIOClient(origin);
        socket.on('rankedPersons', (data) => {
          setCurrentPersons(data.currentPersons);
          setRankedPersons(data.rankedPersons);
        });
        socket.on('newUser', (username) => {
          const newUsers = users.concat(username);
          console.log(newUsers);
          setUsers(newUsers);
        });
        socket.on('removeUser', (username) => {
          const index = users.indexOf(username);
          if (index > -1) {
            users.splice(index, 1);
          }
          setUsers(users);
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchNewOrder();
  }, []);

  const userMenu = (
    <ul>
      <PoseGroup>
        {users.map(user => (
          <Item key={user}>
            <p>{user}</p>
          </Item>
        ))}
      </PoseGroup>
    </ul>
  );

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
  console.log(users);
  return <div className="demo-visualiser-screen">{userMenu}</div>;
};

export default DemoVisualiser;
