const NUM_MISSING_PEOPLE = 128; // TODO: soft code
const EXISTING_AVERAGE = NUM_MISSING_PEOPLE / 2;

function getGraphData(stats) {
  const labels = [];
  const data = [];
  const averagePhotosUsedByExistingSystems = [];

  for (const statsOfAUser of stats) {
    labels.push(statsOfAUser.username)
    data.push(statsOfAUser.viewedPeople.length)
    averagePhotosUsedByExistingSystems.push(EXISTING_AVERAGE);
  }
  const graphData = {
      labels,
      datasets:[
        {
          label: 'Existing solutions (average)',
          type:'line',
          data: averagePhotosUsedByExistingSystems,
          pointBorderColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: 'rgba(0, 0, 0, 0)',
          backgroundColor: 'rgb(255, 112, 79, 0.06)',
          borderColor: 'rgb(255, 112, 79)',
          borderWidth: 5,
        },
        {
          label: 'Reunite',
          data,
          backgroundColor: 'rgba(0, 98, 255, 1)',
        },
      ]
  };
  return graphData;
}

function getPeopleFound(stats) {
  return stats.length;
}

function getAverageNumPhotosUsed(stats) {
  let totalPhotosUsed = 0;
  for (const statsOfAUser of stats) {
    totalPhotosUsed += statsOfAUser.viewedPeople.length;
  }
  const averagePhotosUsed = totalPhotosUsed / stats.length;
  return Math.round(averagePhotosUsed);
}

function getNumPhotosUsed(stats) {
  let numPhotosUsed = 0;
  for (const statsOfAUser of stats) {
    numPhotosUsed += statsOfAUser.viewedPeople.length;
  }
  return numPhotosUsed;
}

function getNumPhotosAvailable(stats) {
  return stats.length * NUM_MISSING_PEOPLE;
}

function getNumPhotosSaved(stats) {
  return getNumPhotosAvailable(stats) - getNumPhotosUsed(stats);
}

function getDoughnutData(stats) {
  const doughnutData = {
    labels: [
      'Photos viewed',
      'Photos saved',
    ],
    datasets: [{
      data: [
        getNumPhotosUsed(stats),
        getNumPhotosSaved(stats),
      ],
      backgroundColor: [
      '#0062ff',
      '#dcdcdc',
      ],
      hoverBackgroundColor: [
      '#6ea6ff',
      '#565656'
      ]
    }]
  };

  return doughnutData;
}

export default {
  EXISTING_AVERAGE,
  getGraphData,
  getPeopleFound,
  getAverageNumPhotosUsed,
  getDoughnutData,
};
