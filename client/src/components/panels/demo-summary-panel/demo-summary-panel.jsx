import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardTitle, CardImage, CardBlock } from 'mineral-ui/Card';
import Flex, { FlexItem } from 'mineral-ui/Flex';

import Button from 'mineral-ui/Button';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Translate from '../../../locales/translate';
import DemoSummaryChart from '../../demo-chart';

const { flexStyle } = require('../../../styles/flex-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');
const { cardImageStyle } = require('../../../styles/card-styles');

const DemoSummaryPanel = (props) => {
  const { moveOn, decisions, foundPersonDetails } = props;
  const nextIcon = <IconNext style={iconStyle} />;

  const numberOfPhotosInTotal = 64;
  const numberOfPhotosRequiredByExistingSolutions = numberOfPhotosInTotal / 2;
  const numberOfChoices = decisions.length;
  const numberOfPhotosSeen = numberOfChoices * 2;

  const demoSummaryData = {
    numberOfPhotosRequiredByExistingSolutions,
    numberOfPhotosSeen,
  };

  return (
    <div className="singleCardContainer">
      <Flex {...flexStyle}>
        <FlexItem>
          <Card style={{ borderRadius: '20px' }} className="statsSummaryCard">
            <CardTitle className="cardTitle">
              <Translate string="demo-summary.title" />
            </CardTitle>
            <CardImage
              className="summaryPersonImage"
              style={cardImageStyle}
              src={foundPersonDetails.img_url}
              alt="gradient placeholder"
            />
            <CardBlock>
              <h3>
                <Translate string="demo-summary.message-2" />
              </h3>
            </CardBlock>
            <DemoSummaryChart demoSummaryData={demoSummaryData} />
            <Button
              className="cardButton"
              style={buttonStyle}
              iconStart={nextIcon}
              onClick={moveOn}
            >
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
  foundPersonDetails: { img_url: '' },
};

DemoSummaryPanel.propTypes = {
  moveOn: PropTypes.func,
  decisions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  foundPersonDetails: PropTypes.objectOf(PropTypes.string),
};

export default DemoSummaryPanel;
