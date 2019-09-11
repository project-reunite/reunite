import React from 'react';
import PropTypes from 'prop-types';

import {
  XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries,
} from 'react-vis';

const demoSummaryChart = (props) => {
  const { demoSummaryData } = props;
  const {
    numberOfPhotosInTotal,
    numberOfPhotosRequiredByExistingSolutions,
    numberOfPhotosSeen,
  } = demoSummaryData;

  const isMobile = window.innerWidth < 400;
  const width = isMobile ? 200 : 300;
  const height = isMobile ? 200 : 300;

  const photosSeenStack = [
    {
      x: 'A',
      y: numberOfPhotosSeen,
    },
  ];

  const existingSolutionStack = [
    { x: 'A', y: numberOfPhotosRequiredByExistingSolutions - numberOfPhotosSeen },
  ];
  const totalStack = [
    {
      x: 'A',
      y: numberOfPhotosInTotal - numberOfPhotosRequiredByExistingSolutions - numberOfPhotosSeen,
    },
  ];

  return (
    <XYPlot width={width} height={height} xType="ordinal" stackBy="y">
      <VerticalBarSeries color="#61B7E1" data={photosSeenStack} />
      <VerticalBarSeries color="yellow" data={existingSolutionStack} />
      <VerticalBarSeries color="red" data={totalStack} />
      <XAxis />
      <YAxis />
    </XYPlot>
  );
};

demoSummaryChart.defaultProps = {
  data: [],
};

demoSummaryChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default demoSummaryChart;
