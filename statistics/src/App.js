import React, { Component, useState, useEffect } from 'react';
import './App.css';
import BarChart from './components/BarChart';
import statsService from './utils/statsService';
import apiRequest from './utils/apiRequests';
import socketIOClient from 'socket.io-client';
import { origin } from './config';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const socket = socketIOClient(origin);
const PROJECT_START_DATE = new Date(1560553200000); // 15/06/2019


const App = () => {
  const [chartData, setChartData] = useState({});
  const [peopleFound, setPeopleFound] = useState(0);
  const [averageNumPhotosUsed, setAverageNumPhotosUsed] = useState(0);
  const [selectedDay, setSelectedDay] = useState(PROJECT_START_DATE);
  
  async function setStatistics(statistics){
    const newChartData = statsService.getGraphData(statistics);
    const newPeopleFound = await statsService.getPeopleFound(statistics);
    const newAverageNumPhotosUsed = await statsService.getAverageNumPhotosUsed(statistics);
    setChartData(newChartData);
    setPeopleFound(newPeopleFound);
    setAverageNumPhotosUsed(newAverageNumPhotosUsed);
  }

  function getStatsSince(stats, date) {
    let statsSinceDate = [];
    for (const statsOfAUser of stats) {
      if (statsOfAUser.created_at >= date) {
        statsSinceDate.push(statsOfAUser)
      }
    }
    return statsSinceDate;
  }

  useEffect(() => {
    const updateDate = async () => {
      try {
        let statistics = await apiRequest.getStatistics();
        statistics = getStatsSince(statistics, selectedDay.getTime())
        await setStatistics(statistics);
      } catch(err) {
        console.error(err);
      }
    }
    updateDate();
  }, [selectedDay]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let statistics = await apiRequest.getStatistics();
        await setStatistics(statistics);
      } catch(err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {

    socket.on('statistics', (data) => {
      const setData = async (data) => {
        console.log(data);
        const statistics = data.docs;
        await setStatistics(statistics);
      };
      setData(data);
    });
  });

  const date = new Date();
  const dateLabel = `${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`

  const handleDayClick = (day) => {
    if (day === selectedDay) {
      setSelectedDay(PROJECT_START_DATE);
    } else {
      setSelectedDay(day);
    }
  }

  return (
    <div className="App">
      <div className="row" style={{backgroundColor: '#132832'}}>
        <div className="column" style={{textAlign: "left"}}>
          <p style={{color: '#FFFFFF', padding: '0 0 0 10px', fontSize: '25px', fontWeight:"bold"}}> <img src='https://reunite.eu-gb.cf.appdomain.cloud/reunite-dark.svg' height="20" width="20"/> Project Reunite Statistics</p>
        </div>
        <div className="column">
          <p> </p>
        </div>
        <div className="column" style={{textAlign: "right"}}>
          <p style={{color: '#FFFFFF', padding: '15px 0 0 0', fontSize: '15px', fontStyle: "italic"}}>Last updated at {dateLabel}</p>
        </div>
      </div>
      <div className="row" style={{backgroundColor: 'rgba(213, 213, 213, 0.3)'}}>
        <div className="column">
          <h1>
            People
            <br></br>
            <span style={{color: '#0062ff'}}>Reunited</span>
          </h1>
          <p className="Data-Value">{peopleFound}</p>
        </div>
        <div className="column">
          <h1>
            Average Photos Checked Per Search
            <br></br>
            <span style={{color: '#0062ff'}}>(Reunite)</span>
          </h1>
          <p className="Data-Value">{averageNumPhotosUsed}</p>
        </div>
        <div className="column">
          <h1>
            Average Photos Checked Per Search
            <br></br>
            <span style={{color: 'rgb(255, 112, 79)'}}>(Existing Solutions)</span>
          </h1>
          <p className="Data-Value" style={{color: 'rgb(255, 112, 79)'}}>
            {statsService.EXISTING_AVERAGE}
          </p>
        </div>
      </div>
      <div className="row">
        <div>
          <BarChart chartData={chartData} />
        </div>
      </div>
      <div className="row">
        <DayPicker  onDayClick={handleDayClick} />
      </div>
      {selectedDay ? (
          <p>You clicked {selectedDay.toLocaleDateString()}</p>
        ) : (
          <p>Please select a day.</p>
        )}
    </div>
  );

}



// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       chartData: {},
//       peopleFound: 0,
//       averageNumPhotosUsed: 0,
//     }
//   }

//   async componentDidMount(){
//     const stats = await apiRequest.getStatistics();
//     const newChartData = statsService.getGraphData(stats);
//     const newPeopleFound = await statsService.getPeopleFound(stats)
//     const newAverageNumPhotosUsed = await statsService.getAverageNumPhotosUsed(stats)
//     this.setState({
//       averageNumPhotosUsed: newAverageNumPhotosUsed,
//       peopleFound: newPeopleFound,
//       chartData: newChartData,
//     });
//   }

//   render(){
//     const {
//       chartData,
//       peopleFound,
//       averageNumPhotosUsed
//     } = this.state;

    // const date = new Date();
    // const dateLabel = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

//     return (
//       <div className="App">
//         <div className="row" style={{backgroundColor: '#171717'}}>
//           <div className="column" style={{textAlign: "left"}}>
//             <p style={{color: '#FFFFFF', padding: '0 0 0 10px', fontSize: '25px', fontWeight:"bold"}}> <img src='https://reunite.eu-gb.cf.appdomain.cloud/reunite-dark.svg' height="20" width="20"/> Project Reunite Statistics</p>
//           </div>
//           <div className="column">
//             <p> </p>
//           </div>
//           <div className="column" style={{textAlign: "right"}}>
//             <p style={{color: '#FFFFFF', padding: '15px 0 0 0', fontSize: '15px', fontStyle: "italic"}}>Last updated at {dateLabel}</p>
//           </div>
//         </div>
//         <div className="row" style={{backgroundColor: 'rgba(213, 213, 213, 0.3)'}}>
//           <div className="column">
//             <h1>
//               People
//               <br></br>
//               <span style={{color: '#0062ff'}}>Reunited</span>
//             </h1>
//             <p className="Data-Value">{peopleFound}</p>
//           </div>
//           <div className="column">
//             <h1>
//               Average Photos Checked Per Search
//               <br></br>
//               <span style={{color: '#0062ff'}}>(Reunite)</span>
//             </h1>
//             <p className="Data-Value">{averageNumPhotosUsed}</p>
//           </div>
//           <div className="column">
//             <h1>
//               Average Photos Checked Per Search
//               <br></br>
//               <span style={{color: 'rgb(255, 112, 79)'}}>(Existing Solutions)</span>
//             </h1>
//             <p className="Data-Value" style={{color: 'rgb(255, 112, 79)'}}>
//               {statsService.EXISTING_AVERAGE}
//             </p>
//           </div>
//         </div>
//         <div className="row">
//           <div>
//             <BarChart chartData={chartData} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default App;
