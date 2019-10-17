import React, {useEffect, useState } from 'react'
import BarChart from './BarChart';
import Histogram from './Histogram';
import statsService from '../utils/statsService';
import apiRequest from '../utils/apiRequests';
import socketIOClient from 'socket.io-client';
import { origin } from '../config';
import 'react-day-picker/lib/style.css';

const socket = socketIOClient(origin);


function getStatsSince(stats, time) {
  let statsSinceDate = [];
  for (const statsOfAUser of stats) {
    if (statsOfAUser.created_at >= time) {
      statsSinceDate.push(statsOfAUser)
    }
  }
  return statsSinceDate;
}

const Dashboard = props => {
  const [statistics, setStatistics] = useState([])
  const [displayStats, setDisplayStats] = useState({
    histogramData: {},
    barChartData: {},
    averageNumPhotosUsed: 0,
    peopleFound: 0,
  })
  const { selectedDay } = props;

  useEffect(() => {
    const updateDisplayStats = async() => {
      try {
        const newHistogramData = statsService.getHistogramData(statistics);
        const newBarChartData = statsService.getBarChartData(statistics);
        const newPeopleFound = statsService.getPeopleFound(statistics);
        const newAverageNumPhotosUsed = statsService.getAverageNumPhotosUsed(statistics);
        console.log(newPeopleFound);
        const newDisplayStats = {
          ...displayStats,
          histogramData: newHistogramData,
          barChartData: newBarChartData,
          averageNumPhotosUsed: newAverageNumPhotosUsed,
          peopleFound: newPeopleFound,
        }
        setDisplayStats(newDisplayStats)
      } catch (err) {
        console.error(err);
      }
    }
    updateDisplayStats();
  }, [statistics]);

  useEffect(() => {
    const filterStatsByDate = async () => {
      try {
        const allStats = await apiRequest.getStatistics();
        if (selectedDay) {
          setStatistics(getStatsSince(allStats, selectedDay.getTime()));
        } else {
          setStatistics(allStats)
        }
      } catch (err) {
        console.error(err);
      }
    }
    filterStatsByDate();
  }, [selectedDay]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let statistics = await apiRequest.getStatistics();
        setStatistics(statistics);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on('statistics', (data) => {
      const updateData = () => {
        const statistics = data.docs;
        console.log(statistics)
        const { selectedDay } = props;
        if (selectedDay) {
        setStatistics(getStatsSince(statistics, selectedDay.getTime()))
        } else {
        setStatistics(statistics);
      };
    }
      updateData();
    });
  });

  const date = new Date();
  const dateLabel = `${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`

  const { histogramData, barChartData, averageNumPhotosUsed, peopleFound } = displayStats;

  return (
    <div>
      <div className="row" style={{ backgroundColor: '#132832' }}>
        <div className="column" style={{ textAlign: "left" }}>
          <p style={{ color: '#FFFFFF', padding: '0 0 0 10px', fontSize: '25px', fontWeight: "bold" }}> <img src='https://reunite.eu-gb.cf.appdomain.cloud/reunite-dark.svg' height="20" width="20" /> Project Reunite Statistics</p>
        </div>
        <div className="column">
          <p> </p>
        </div>
        <div className="column" style={{ textAlign: "right" }}>
          <p style={{ color: '#FFFFFF', padding: '15px 0 0 0', fontSize: '15px', fontStyle: "italic" }}>Last updated at {dateLabel}</p>
        </div>
      </div>
      <div className="row" style={{ backgroundColor: 'rgba(213, 213, 213, 0.3)' }}>
        <div className="column">
          <h1>
            People
            <br></br>
            <span style={{ color: '#0062ff' }}>Reunited</span>
          </h1>
          <p className="Data-Value">{peopleFound}</p>
        </div>
        <div className="column">
          <h1>
            Average Photos Checked Per Search
            <br></br>
            <span style={{ color: '#0062ff' }}>(Reunite)</span>
          </h1>
          <p className="Data-Value">{averageNumPhotosUsed}</p>
        </div>
        <div className="column">
          <h1>
            Average Photos Checked Per Search
            <br></br>
            <span style={{ color: 'rgb(255, 112, 79)' }}>(Existing Solutions)</span>
          </h1>
          <p className="Data-Value" style={{ color: 'rgb(255, 112, 79)' }}>
            {statsService.EXISTING_AVERAGE}
          </p>
        </div>
      </div>
      <div className="row">
        <div>
          <BarChart chartData={barChartData} />
        </div>
      </div>
      <div className="row">
        <div>
          <Histogram chartData={histogramData} />
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {

}

export default Dashboard

