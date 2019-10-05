import React, { useState, useEffect } from 'react';

import socketIOClient from 'socket.io-client';
import { PoseGroup } from 'react-pose';

import UserMenu from '../../menus/user-menu';
import FaceChartMenu from '../../menus/face-charts-menu';
import Face from '../../faces/visualiser-face';
import FacePredictionChart from '../../charts/face-prediction-chart';

import { origin } from '../../../config';
import { AnimatedDiv } from '../../animations/div-animations';
import { AnimatedFaceDiv } from '../../animations/list-animations';
import { getPersonsInNameOrder, generateDataForFacePredictionChart } from '../../../utils/util-functions';
import useWindowSize from '../../../hooks/useWindowSize';

import './demo-visualiser-screen.scss';

const socket = socketIOClient(origin);

const DemoVisualiser = () => {
  const [rankedPersons, setRankedPersons] = useState({});
  const [currentPersons, setCurrentPersons] = useState({});
  const [showFaceCharts, setShowFaceCharts] = useState(false);
  const [showCurrentEstimateChart, setShowCurrentEstimateChart] = useState(false);
  const [users, setUsers] = useState([]);
  const [personsSortedByName, setPersonsSortedByName] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [facePrediction, setFacePrediction] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const size = useWindowSize();

  const facePredictionRadius = isMobile ? 50 : 100;

  useEffect(() => {
    setIsMobile(size.width < 600);
  }, [size]);

  // Fetches initial sorted list, when visualiser first renders
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
    socket.on('newUser', (username) => {
      const newUsers = users.concat(username);
      setUsers(newUsers);
    });
    return () => {
      socket.off('newUser');
    };
  });

  useEffect(() => {
    socket.on('rankedPersons', (data) => {
      const newRankedPersons = { ...rankedPersons };
      const newCurrentPersons = { ...currentPersons };
      const newFacePrediction = { ...facePrediction };
      newRankedPersons[data.username] = data.rankedPersons;
      newCurrentPersons[data.username] = data.currentPersons;
      newFacePrediction[data.username] = data.facePrediction;
      setRankedPersons(newRankedPersons);
      setCurrentPersons(newCurrentPersons);
      setFacePrediction(newFacePrediction);
    });
    return () => {
      socket.off('rankedPersons');
    };
  });


  const removeUser = (username) => {
    const newUsers = [...users];
    const newRankedPersons = { ...rankedPersons };
    const newFacePrediction = { ...facePrediction };
    delete newRankedPersons[username];
    delete newFacePrediction[username];
    const index = newUsers.indexOf(username);
    if (index > -1) {
      newUsers.splice(index, 1);
    }
    setRankedPersons(newRankedPersons);
    setUsers(newUsers);
    setFacePrediction(newFacePrediction);
  };

  useEffect(() => {
    socket.on('removeUser', (username) => {
      removeUser(username);
    });
    return () => {
      socket.off('removeUser');
    };
  });

  const pageTitle = (
    <PoseGroup>
      <AnimatedDiv key="title">
        <h1>Reunite Search Visualiser</h1>
      </AnimatedDiv>
    </PoseGroup>
  );

  const userMenu = (
    <UserMenu
      users={users}
      setCurrentUser={setCurrentUser}
      removeUser={removeUser}
      currentUser={currentUser}
    />
  );

  const faces = rankedPersons[currentUser] ? (
    rankedPersons[currentUser].map(person => (
      <AnimatedFaceDiv key={person.name}>
        <Face
          person={person}
          personSeen={person.personSeen}
          currentPersons={currentPersons[currentUser]}
          showFaceCharts={showFaceCharts}
          isMobile={isMobile}
        />
      </AnimatedFaceDiv>
    ))
  ) : (
    personsSortedByName.map(person => (
      <AnimatedFaceDiv key={person.name}>
        <Face
          person={person}
          showFaceCharts={showFaceCharts}
          isMobile={isMobile}
        />
      </AnimatedFaceDiv>
    ))
  );

  const facePanel = (
    <ul>
      <PoseGroup>
        {faces}
      </PoseGroup>
    </ul>
  );

  const showFaceChartsButton = (
    <FaceChartMenu
      showCurrentEstimateChart={showCurrentEstimateChart}
      showFaceCharts={showFaceCharts}
      setShowCurrentEstimateChart={setShowCurrentEstimateChart}
      setShowFaceCharts={setShowFaceCharts}
    />
  );

  const predictedFaceChart = () => {
    const prediction = generateDataForFacePredictionChart(facePrediction[currentUser]
      || [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);
    const chart = showCurrentEstimateChart
      ? (
        <PoseGroup>
          <AnimatedDiv key="predictionChart" className="predictionChart">
            <h2>Current estimate of missing person&apos;s features</h2>
            <FacePredictionChart size={facePredictionRadius} data={prediction} />
          </AnimatedDiv>
        </PoseGroup>
      ) : null;

    return chart;
  };

  return (
    <div className="demo-visualiser-screen">
      {userMenu}
      {pageTitle}
      {showFaceChartsButton}
      {predictedFaceChart()}
      {facePanel}
    </div>
  );
};

export default DemoVisualiser;
