
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import apiRequests from '../../utils/apiRequests';
import { origin } from '../../config';
import './missing-people-screen.scss';

const getPersonsInNameOrder = async () => {
  const persons = await apiRequests.getPersonsWithNFeatures();
  const personsInNameOrder = persons.sort((person1, person2) => (person1.name > person2.name));
  return personsInNameOrder;
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
    (
      <h1>
        {`Here are the ${numMissingPeople} missing people.`}
      </h1>
    ),
    (
      <h3>
        {'Choose (in your head) who you\'re looking for.'}
      </h3>
    ),
    (
      <h3>
        {'When you\'re ready, go back to the Reunite app to start searching for them.'}
      </h3>
    ),
    (
      <p>
        {'(These photos are generated from celebrity faces. This demo uses these faces because we do not yet have access to a database of refugees)'}
      </p>
    ),
  ];

  const faces = persons.map((person) => {
    const { name } = person;
    const url = person.img_url;
    const absoluteUrl = `${origin}${url}`;
    return (
      <Face
        key={url}
        src={absoluteUrl}
        name={name}
      />
    );
  });

  return (
    <div className="missing-people-screen">
      {pageExplanation}
      <br />
      {faces}
    </div>
  );
};

const Face = (props) => {
  const { src, name } = props;
  return (
    <img
      className="face"
      src={src}
      alt={name}
    />
  );
};

Face.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.number.isRequired,
};


export default MissingPeopleScreen;
