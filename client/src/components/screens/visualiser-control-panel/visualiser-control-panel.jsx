import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Slider from 'rc-slider';
import apiRequests from '../../../utils/apiRequests';
import { origin } from '../../../config';

import UserMenu from '../../menus/user-menu';
import SliderHandle from './slider-handle';
import './visualiser-control-panel.scss';
import 'rc-slider/assets/index.css';

const socket = socketIOClient(origin);

const setCurrentUser = async (username) => {
  try {
    await apiRequests.postCurrentUser(username);
  } catch (err) {
    console.log(err);
  }
};

const removeUser = async (username) => {
  try {
    await apiRequests.deleteUser(username);
  } catch (err) {
    console.log(err);
  }
};

const VisualiserControlPanel = () => {
  const [showFaceCharts, setShowFaceCharts] = useState(false);
  const [showCurrentEstimateChart, setShowCurrentEstimateChart] = useState(false);
  const [showProbabilities, setShowProbabilities] = useState(false);
  const [minimumFaceOpacity, setMinimumFaceOpacity] = useState(0.3);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function postSetting() {
      try {
        await apiRequests.postVisualiserSetting({
          showCurrentEstimateChart,
        });
      } catch (err) {
        console.log(err);
      }
    }
    postSetting();
  }, [showCurrentEstimateChart]);

  useEffect(() => {
    socket.on('users', (userList) => {
      setUsers(userList);
      return () => {
        socket.off('users');
      };
    });
  });

  useEffect(() => {
    async function postSetting() {
      try {
        await apiRequests.postVisualiserSetting({
          showFaceCharts,
        });
      } catch (err) {
        console.log(err);
      }
    }
    postSetting();
  }, [showFaceCharts]);

  useEffect(() => {
    async function postSetting() {
      try {
        await apiRequests.postVisualiserSetting({
          minimumFaceOpacity,
        });
      } catch (err) {
        console.log(err);
      }
    }
    postSetting();
  }, [minimumFaceOpacity]);

  useEffect(() => {
    async function postSetting() {
      try {
        await apiRequests.postVisualiserSetting({
          showProbabilities,
        });
      } catch (err) {
        console.log(err);
      }
    }
    postSetting();
  }, [showProbabilities]);

  const userMenu = (
    <UserMenu users={users} setCurrentUser={setCurrentUser} removeUser={removeUser} />
  );

  const sliderStyle = { width: 300, margin: 'auto', padding: '10px 0px' };

  return (
    <div className="visualiser-control-panel">
      <img src="reunite-dark.svg" className="title-image" alt="reunite-logo" />
      <h1>Visualiser Control Panel</h1>
      {userMenu}
      <div className="opacity-slider">
        <h2>Minimum Face Opacity</h2>
        <div style={sliderStyle}>
          <Slider
            min={0}
            max={1}
            step={0.1}
            defaultValue={0.3}
            handle={SliderHandle}
            onAfterChange={value => setMinimumFaceOpacity(value)}
          />
        </div>
      </div>
      <ul className="buttons">
        <li>
          <button
            type="button"
            className="show-graphs-button"
            onClick={() => setShowCurrentEstimateChart(true)}
          >
            {'Show Current Estimate'}
          </button>
          <button
            type="button"
            className="show-graphs-button"
            onClick={() => setShowCurrentEstimateChart(false)}
          >
            {'Hide Current Estimate'}
          </button>
        </li>
        <li>
          <button
            type="button"
            className="show-graphs-button"
            onClick={() => setShowFaceCharts(true)}
          >
            {'Show Image Analysis'}
          </button>
          <button
            type="button"
            className="show-graphs-button"
            onClick={() => setShowFaceCharts(false)}
          >
            {'Hide Image Analysis'}
          </button>
        </li>
        <li>
          <button
            type="button"
            className="show-graphs-button"
            onClick={() => setShowProbabilities(true)}
          >
            {'Show Probabilities'}
          </button>
          <button
            type="button"
            className="show-graphs-button"
            onClick={() => setShowProbabilities(false)}
          >
            {'Hide Probabilities'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default VisualiserControlPanel;
