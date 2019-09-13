import React from 'react';
import PropTypes from 'prop-types';

import {
  XYPlot,
  YAxis,
  VerticalBarSeries,
  DiscreteColorLegend,
  HorizontalGridLines,
} from 'react-vis';

const plotMargin = {
  left: 60,
  right: 30,
  top: 10,
  bottom: 10,
};

const demoSummaryChart2 = (props) => {
  const { demoSummaryData } = props;
  const {
    numberOfPhotosInTotal,
    numberOfPhotosRequiredByExistingSolutions,
    numberOfPhotosSeen,
  } = demoSummaryData;

  const isMobile = window.innerWidth < 400;
  const width = isMobile ? 300 : 300;
  const height = isMobile ? 230 : 230;

  const legendItems = [
    {
      title: 'Viewed by you, using Reunite',
      color: '#132832',
      strokeWidth: '6px',
    },
    {
      title: 'Average photos viewed using existing system',
      color: '#408bfc',
      strokeWidth: '6px',
    },
    {
      title: 'Maximum number of photos',
      color: '#61B7E1',
      strokeWidth: '6px',
    },
  ];

  const data = [
    {
      x: 1,
      y: numberOfPhotosInTotal,
      color: '#61B7E1',
    },
    {
      x: 2,
      y: numberOfPhotosRequiredByExistingSolutions,
      color: '#408bfc',
    },
    {
      x: 3,
      y: numberOfPhotosSeen,
      color: '#132832',
    },
  ];

  return (
    <XYPlot width={width} animation margin={plotMargin} height={height}>
      <HorizontalGridLines />
      <VerticalBarSeries animation colorType="literal" data={data} />
      <DiscreteColorLegend items={legendItems} />
      <YAxis />
    </XYPlot>
  );
};

demoSummaryChart2.defaultProps = {
  data: [],
};

demoSummaryChart2.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default demoSummaryChart2;
