import React from 'react';
import PropTypes from 'prop-types';

import {
  XYPlot, YAxis, VerticalBarSeries, DiscreteColorLegend,
} from 'react-vis';

const plotMargin = {
  left: 60,
  right: 30,
  top: 10,
  bottom: 10,
};

const demoSummaryChart = (props) => {
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
      title: 'Average saving, compared to existing solution',
      color: '#408bfc',
      strokeWidth: '6px',
    },
    {
      title: 'The rest of the photos',
      color: '#61B7E1',
      strokeWidth: '6px',
    },
  ];

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
    <XYPlot width={width} margin={plotMargin} height={height} xType="ordinal" stackBy="y">
      <DiscreteColorLegend items={legendItems} />
      <VerticalBarSeries barWidth={0.6} color="#132832" data={photosSeenStack} />
      <VerticalBarSeries
        barWidth={0.6}
        color="#408bfc

"
        data={existingSolutionStack}
      />
      <VerticalBarSeries
        barWidth={0.6}
        color="#61B7E1"
        data={totalStack}
      />
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
