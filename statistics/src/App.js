import React, { Component } from 'react';
import './App.css';
import BarChart from './components/BarChart';
import statsService from './utils/statsService';
import apiRequest from './utils/apiRequests';

class App extends Component {
  constructor(){
    super();
    this.state = {
      chartData: {},
      peopleFound: 0,
      averageNumPhotosUsed: 0,
    }
  }

  async componentDidMount(){
    const stats = await apiRequest.getStatistics();
    const newChartData = statsService.getGraphData(stats);
    const newPeopleFound = await statsService.getPeopleFound(stats)
    const newAverageNumPhotosUsed = await statsService.getAverageNumPhotosUsed(stats)
    this.setState({
      averageNumPhotosUsed: newAverageNumPhotosUsed,
      peopleFound: newPeopleFound,
      chartData: newChartData,
    });
  }

  render(){
    const {
      chartData,
      peopleFound,
      averageNumPhotosUsed
    } = this.state;

    const date = new Date();
    const dateLabel = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return (
      <div className="App">
        <div className="row" style={{backgroundColor: '#171717'}}>
          <div className="column" style={{textAlign: "left"}}>
            <p style={{color: '#FFFFFF', padding: '0 0 0 10px', fontSize: '25px', fontWeight:"bold"}}> <img src='https://reunite.eu-gb.cf.appdomain.cloud/reunite-dark.svg' height="20" width="20"/> Project Reunite Statistics</p>
          </div>
          <div className="column">
            <p> </p>
          </div>
          <div className="column" style={{textAlign: "right"}}>
            <p style={{color: '#FFFFFF', padding: '15px 0 0 0', fontSize: '15px', fontStyle: "italic"}}>Updated: {dateLabel}</p>
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
      </div>
    );
  }
}

export default App;
