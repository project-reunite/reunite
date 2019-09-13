import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardTitle } from 'mineral-ui/Card';
import Flex, { FlexItem } from 'mineral-ui/Flex';

import Button from 'mineral-ui/Button';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Translate from '../../../locales/translate';
import DemoSummaryChart3 from '../../demo-chart-3';

const { flexStyle } = require('../../../styles/flex-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

const DemoSummaryPanel = (props) => {
  const { moveOn, decisions } = props;
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
      <Flex {...flexStyle}>
        <FlexItem>
          <Card style={{ height: '480px', borderRadius: '20px' }} className="statsSummaryCard">
            <CardTitle className="cardTitle">Photos Viewed</CardTitle>
            <DemoSummaryChart3 demoSummaryData={demoSummaryData} />
            <Button className="cardButton" style={buttonStyle} iconStart={nextIcon} onClick={moveOn}>
              <Translate string="button.next" />
            </Button>
          </Card>
        </FlexItem>
      </Flex>
    </div>
  );
};

DemoSummaryPanel.defaultProps = {
  moveOn: () => {},
  decisions: [{}],
};

DemoSummaryPanel.propTypes = {
  moveOn: PropTypes.func,
  decisions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default DemoSummaryPanel;
