const NUM_MISSING_PEOPLE = 128; // TODO: soft code
const EXISTING_AVERAGE = NUM_MISSING_PEOPLE / 2;

function getBinLabels(binDefinitions){
  let labels = [];
  binDefinitions.forEach(bin => {
    let label = `${bin.min} - ${bin.max} Photos`
    labels.push(label);
  });
  return labels;
}

function getGraphData(stats) {
  const averagePhotosUsedByExistingSystems = [];
  let binDefinitions = [{
      min: 0,
      max:4,
      count: 0,
    }, {
      min: 6,
      max:8,
      count: 0,
    }, {
      min: 10,
      max:12,
      count: 0,
    }, {
      min: 14,
      max: 16,
      count: 0,
    }, {
      min: 18,
      max:20,
      count: 0,
    }, {
      min: 22,
      max:28,
      count: 0,
    }, {
      min: 30,
      max: NUM_MISSING_PEOPLE / 2,
      count: 0,
    }, {
      min: (NUM_MISSING_PEOPLE / 2) + 2,
      max: NUM_MISSING_PEOPLE,
      count: 0,
    }];
  const labels = getBinLabels(binDefinitions);


  for (const statsOfAUser of stats) {
    binDefinitions.forEach(bin => {
      if(statsOfAUser.viewedPeople.length >= bin.min && statsOfAUser.viewedPeople.length <= bin.max) {
        bin.count = bin.count + 1;
      }
    });
  }

  let data = [];
  binDefinitions.forEach(bin => {
    data.push(bin.count);
  });

  const graphData = {
      labels,
      datasets:[
        {
          label: 'Number of Users',
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
