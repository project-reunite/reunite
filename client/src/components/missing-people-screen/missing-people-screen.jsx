import React, { useState, useEffect } from 'react';

import Face from '../faces/missing-persons-face';

import apiRequests from '../../utils/apiRequests';
import { origin } from '../../config';
import './missing-people-screen.scss';

const getPersonsInNameOrder = async () => {
  const persons = await apiRequests.getPersonsWithNFeatures();
  return persons.sort((person1, person2) => (person1.name > person2.name ? 1 : -1));
};

const MissingPeopleScreen = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    async function fetchPersons() {
      try {
        const newPersons = await getPersonsInNameOrder();
        setPersons(newPersons);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPersons();
  }, []);

  const numMissingPeople = persons.length || 128;

  const pageExplanation = [
    <h1>{`Here are the ${numMissingPeople} missing people.`}</h1>,
    <h3>Choose (in your head) who &apos;re looking for.</h3>,
    <h3>When you&apos;re ready, go back to the Reunite app to start searching for them.</h3>,
    <p>
      {
        '(These photos are generated from celebrity faces. This demo uses these faces because we do not yet have access to a database of refugees)'
      }
    </p>,
  ];

  const faces = (
    <ul id="#menu">
      {persons.map(person => (

        <Face
          key={person.name}
          id={person._id}
          src={`${origin}${person.img_url}`}
          name={person.name}
        />

      ))}
    </ul>
  );

  return (
    <div className="missing-people-screen">
      {pageExplanation}
      <br />
      {faces}
    </div>
  );
};

export default MissingPeopleScreen;
