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
  const [visualiserData, setVisualiserData] = useState({});
  const [showFaceCharts, setShowFaceCharts] = useState(false);
  const [showCurrentEstimateChart, setShowCurrentEstimateChart] = useState(false);
  const [personsSortedByName, setPersonsSortedByName] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const size = useWindowSize();

  const facePredictionRadius = isMobile ? 50 : 100;

  useEffect(() => {
    setIsMobile(size.width < 500);
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
      const newVisualiserData = { ...visualiserData };
      newVisualiserData[username] = {
        rankedPersons: [],
        currentPersons: [],
        facePrediction: [],
      };
      setVisualiserData(newVisualiserData);
    });
    return () => {
      socket.off('newUser');
    };
  });

  useEffect(() => {
    socket.on('rankedPersons', (data) => {
      const newVisualiserData = { ...visualiserData };
      if (newVisualiserData[data.username]) {
        newVisualiserData[data.username].rankedPersons = data.rankedPersons;
        newVisualiserData[data.username].currentPersons = data.currentPersons;
        newVisualiserData[data.username].facePrediction = data.facePrediction;
      }
      setVisualiserData(newVisualiserData);
    });
    return () => {
      socket.off('rankedPersons');
    };
  });

  const removeUser = (username) => {
    const newVisualiserData = { ...visualiserData };
    delete newVisualiserData[username];
    setVisualiserData(newVisualiserData);
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
      users={Object.keys(visualiserData)}
      setCurrentUser={setCurrentUser}
      removeUser={removeUser}
      currentUser={currentUser}
    />
  );

  let faces;
  // If rankedPersons hasn't been received, default to ordering by name
  if (visualiserData[currentUser] && visualiserData[currentUser].rankedPersons.length > 0) {
    // const facesLength = 1.2 * visualiserData[currentUser].rankedPersons.length;
    const maximumProbability = visualiserData[currentUser].rankedPersons[0].probability;
    faces = visualiserData[currentUser].rankedPersons.map(person => (
      <AnimatedFaceDiv key={person.name}>
        <Face
          person={person}
          personSeen={person.personSeen}
          currentPersons={visualiserData[currentUser].currentPersons}
          showFaceCharts={showFaceCharts}
          isMobile={isMobile}
          // position={(facesLength - index) / facesLength}
          maximumProbability={maximumProbability}
        />
      </AnimatedFaceDiv>
    ));
  } else {
    // const facesLength = personsSortedByName.length * 1.2;
    faces = personsSortedByName.map(person => (
      <AnimatedFaceDiv key={person.name}>
        <Face
          person={person}
          showFaceCharts={showFaceCharts}
          isMobile={isMobile}
          // position={(facesLength - index) / facesLength}
          maximumProbability={1}
        />
      </AnimatedFaceDiv>
    ));
  }

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
    // Default to 0.5 for each feature if user doesn't exist or isn't searching yet
    const facePrediction = (visualiserData[currentUser]
      && visualiserData[currentUser].facePrediction.length > 0)
      ? visualiserData[currentUser].facePrediction
      : [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    const faceChartData = generateDataForFacePredictionChart(facePrediction);

    const chart = showCurrentEstimateChart
      ? (
        <PoseGroup>
          <AnimatedDiv key="predictionChart" className="predictionChart">
            <h2>Current estimate of missing person&apos;s features</h2>
            <FacePredictionChart size={facePredictionRadius} data={faceChartData} />
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
