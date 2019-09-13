import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import Flex from 'mineral-ui/Flex/Flex';

import Button from 'mineral-ui/Button';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Translate from '../../../locales/translate';
import DemoSummaryChart from '../../demo-chart';
import DemoSummaryChart2 from '../../demo-chart-2';
import DemoSummaryChart3 from '../../demo-chart-3';

const { statsCardStyle } = require('../../../styles/card-styles');
const { flexStyle } = require('../../../styles/flex-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');
const { matchCardStyle, cardImageStyle } = require('../../../styles/card-styles');

const DemoSummaryPanel = (props) => {
  const { foundPersonDetails, moveOn, decisions } = props;
  const nextIcon = <IconNext style={iconStyle} />;

  const numberOfPhotosInTotal = 64;
  const numberOfPhotosRequiredByExistingSolutions = numberOfPhotosInTotal / 2;
  const numberOfChoices = decisions.length;
  const numberOfPhotosSeen = numberOfChoices * 2;

  const demoSummaryData = {
    numberOfPhotosInTotal,
    numberOfPhotosRequiredByExistingSolutions,
    numberOfPhotosSeen,
  };

  return (
    <div className="demoSummaryCardContainer">
      <Card style={{ height: '480px', borderRadius: '20px' }} className="statsSummaryCard">
        <CardTitle className="cardTitle">Photos Viewed</CardTitle>
        <DemoSummaryChart3 demoSummaryData={demoSummaryData} />
        <Button className="cardButton" style={buttonStyle} iconStart={nextIcon} onClick={moveOn}>
          <Translate string="button.next" />
        </Button>
      </Card>
    </div>
  );
};

DemoSummaryPanel.defaultProps = {
  foundPersonDetails: {},
  moveOn: () => {},
  decisions: [{}],
};

DemoSummaryPanel.propTypes = {
  foundPersonDetails: PropTypes.objectOf(PropTypes.string),
  moveOn: PropTypes.func,
  decisions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default DemoSummaryPanel;
