import React, { useState, useEffect } from 'react';

import socketIOClient from 'socket.io-client';
import { PoseGroup } from 'react-pose';

import UserMenu from '../../menus/user-menu';
import Face from '../../faces/visualiser-face';
import FacePredictionChart from '../../charts/face-prediction-chart';
import ColorBar from '../../color-bar';

import { origin } from '../../../config';
import { StandardAnimatedDiv } from '../../animations/div-animations';
import { AnimatedFaceDiv } from '../../animations/list-animations';
import {
  getPersonsInNameOrder,
  generateDataForFacePredictionChart,
} from '../../../utils/util-functions';
import useWindowSize from '../../../hooks/useWindowSize';

import apiRequests from '../../../utils/apiRequests';
import './demo-visualiser-screen.scss';

const socket = socketIOClient(origin);

const DemoVisualiser = () => {
  const [visualiserData, setVisualiserData] = useState({});
  const [personsSortedByName, setPersonsSortedByName] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [visualiserSettings, setVisualiserSettings] = useState({
    showFaceCharts: false,
    showCurrentEstimateChart: false,
    showProbabilities: true,
    minimumFaceOpacity: 0.3,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [users, setUsers] = useState([]);

  const size = useWindowSize();
  const facePredictionRadius = isMobile ? 50 : 200;

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
    socket.on('users', (userList) => {
      setUsers(userList);
      return () => {
        socket.off('users');
      };
    });
  });

  useEffect(() => {
    socket.on('currentUser', (user) => {
      setCurrentUser(user);
    });
    return () => {
      socket.off('currentUser');
    };
  });

  useEffect(() => {
    socket.on('rankedPersons', (data) => {
      setVisualiserData(data);
    });
    return () => {
      socket.off('rankedPersons');
    };
  });

  useEffect(() => {
    socket.on('settings', (settings) => {
      const newVisualiserSettings = { ...visualiserSettings, ...settings };
      setVisualiserSettings(newVisualiserSettings);
    });
    return () => {
      socket.off('settings');
    };
  });

  const removeUser = async (username) => {
    try {
      await apiRequests.deleteUser(username);
    } catch (err) {
      console.log(err);
    }
  };

  const pageTitle = (
    <PoseGroup>
      <StandardAnimatedDiv key="title">
        <h1>Reunite Search Visualiser</h1>
      </StandardAnimatedDiv>
    </PoseGroup>
  );

  const userMenu = (
    <UserMenu
      users={users}
      removeUser={removeUser}
      setCurrentUser={setCurrentUser}
      currentUser={currentUser}
    />
  );

  let faces;
  // If rankedPersons hasn't been received, default to ordering by name
  if (visualiserData[currentUser] && visualiserData[currentUser].rankedPersons.length > 0) {
    const maximumProbability = visualiserData[currentUser].rankedPersons[0].probability;
    const probabilities = visualiserData[currentUser].rankedPersons.map(
      person => person.probability,
    );
    const minimumProbability = Math.min(...probabilities);
    faces = visualiserData[currentUser].rankedPersons.map((person, index) => (
      <AnimatedFaceDiv key={person.name}>
        <Face
          person={person}
          personSeen={person.personSeen}
          currentPersons={visualiserData[currentUser].currentPersons}
          showFaceCharts={visualiserSettings.showFaceCharts}
          isMobile={isMobile}
          maximumProbability={maximumProbability}
          minimumProbability={minimumProbability}
          minFaceOpacity={visualiserSettings.minimumFaceOpacity}
          showProbability={visualiserSettings.showProbabilities}
          position={index}
        />
      </AnimatedFaceDiv>
    ));
  } else {
    faces = personsSortedByName.map((person, index) => (
      <AnimatedFaceDiv key={person.name}>
        <Face
          person={person}
          showFaceCharts={visualiserSettings.showFaceCharts}
          isMobile={isMobile}
          minFaceOpacity={visualiserSettings.minimumFaceOpacity}
          showProbability={false}
          position={index}
        />
      </AnimatedFaceDiv>
    ));
  }

  const facePanel = (
    <ul>
      <PoseGroup>{faces}</PoseGroup>
    </ul>
  );

  const predictedFaceChart = () => {
    // Default to 0.5 for each feature if user doesn't exist or isn't searching yet
    const facePrediction = visualiserData[currentUser] && visualiserData[currentUser].facePrediction.length > 0
      ? visualiserData[currentUser].facePrediction
      : [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    const faceChartData = generateDataForFacePredictionChart(facePrediction);

    const chart = visualiserSettings.showCurrentEstimateChart ? (
      <PoseGroup>
        <StandardAnimatedDiv key="predictionChart" className="face-prediction-chart">
          <h2>Current estimate of missing person&apos;s features</h2>
          <div className="labeled-chart">
            <FacePredictionChart size={facePredictionRadius} data={faceChartData} />
            <ColorBar />
          </div>
        </StandardAnimatedDiv>
      </PoseGroup>
    ) : null;
    return chart;
  };

  return (
    <div className="demo-visualiser-screen">
      {userMenu}
      {pageTitle}
      {predictedFaceChart()}
      {facePanel}
    </div>
  );
};

export default DemoVisualiser;
