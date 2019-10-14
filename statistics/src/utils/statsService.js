const NUM_MISSING_PEOPLE = 128; // TODO: soft code
const EXISTING_AVERAGE = NUM_MISSING_PEOPLE / 2;

function getBinLabels(binDefinitions){
  let labels = [];
  binDefinitions.forEach(bin => {
    let label = `${bin.min} - ${bin.max}`
    labels.push(label);
  });
  return labels;
}

function getGraphData(stats) {
  const smoothedTotalUsers = [];
  let binDefinitions = [{
      min: 2,
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
      max:24,
      count: 0,
    }, {
      min: 26,
      max:28,
      count: 0,
    }, {
      min: 30,
      max:32,
      count: 0,
    }, {
      min: 34,
      max:36,
      count: 0,
    }, {
      min: 38,
      max:40,
      count: 0,
    }, {
      min: 42,
      max:44,
      count: 0,
    }, {
      min: 46,
      max:48,
      count: 0,
    }, {
      min: 50,
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
    smoothedTotalUsers.push(bin.count);
  });

  let existingSolutionData = [1, 1, 10, 15, 20, 30, 40, 50, 80, 50];

// console.log(data);
// console.log(existingSolutionData);

  const graphData = {
      labels,
      datasets:[
        // {
        //   label: 'Smoothed',
        //   type:'line',
        //   data: smoothedTotalUsers,
        //   pointBorderColor: 'rgba(0, 0, 0, 0)',
        //   pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        //   backgroundColor: 'rgb(255, 112, 79, 0.06)',
        //   borderColor: 'rgb(255, 112, 79)',
        //   borderWidth: 5,
        // },
        // {
        //   label: 'existingSolution',
        //   type:'line',
        //   data: existingSolutionData,
        //   pointBorderColor: 'rgba(0, 0, 0, 0)',
        //   pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        //   backgroundColor: 'rgb(255, 112, 79, 0.06)',
        //   borderColor: 'rgb(255, 112, 79)',
        //   borderWidth: 5,
        // },
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
  if (stats.length === 0 ) {
    return 0;
  } else {
    let totalPhotosUsed = 0;
    for (const statsOfAUser of stats) {
      totalPhotosUsed += statsOfAUser.viewedPeople.length;
    }
    const averagePhotosUsed = totalPhotosUsed / stats.length;
    return Math.round(averagePhotosUsed);
  }
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
