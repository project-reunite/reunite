import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import Flex from 'mineral-ui/Flex/Flex';

import Button from 'mineral-ui/Button';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Translate from '../../../locales/translate';
import DemoSummaryChart from '../../demo-chart';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { flexStyle } = require('../../../styles/flex-styles');
const { buttonStyle } = require('../../../styles/button-styles');

const { iconStyle } = require('../../../styles/icon-styles');

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
      <Flex wrap {...flexStyle}>
        <FlexItem>
          <Card style={matchCardStyle} className="demoSummaryCard">
            <CardTitle className="cardTitle">
              <Translate string="demo-summary.title" />
            </CardTitle>
            <CardImage
              className="matchCardImage"
              style={cardImageStyle}
              src={foundPersonDetails.data.img_url}
              alt="gradient placeholder"
            />
            <CardBlock>
              <Button
                className="cardButton"
                style={buttonStyle}
                iconStart={nextIcon}
                onClick={moveOn}
              >
                <Translate string="button.next" />
              </Button>
            </CardBlock>
          </Card>
        </FlexItem>
        <FlexItem>
          <Card style={matchCardStyle} className="demoSummaryCard">
            <CardTitle className="cardTitle">Faces viewed</CardTitle>
            <CardBlock style={cardBlockStyle}>
              <DemoSummaryChart
                demoSummaryData={demoSummaryData}
              />
            </CardBlock>
          </Card>
        </FlexItem>
      </Flex>
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
