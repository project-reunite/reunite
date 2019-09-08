import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import Flex from 'mineral-ui/Flex/Flex';

import Button from 'mineral-ui/Button';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Translate from '../../../locales/translate';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { flexStyle } = require('../../../styles/flex-styles');
const { buttonStyle } = require('../../../styles/button-styles');

const { iconStyle } = require('../../../styles/icon-styles');

const DemoSummaryPanel = (props) => {
  const { foundPersonDetails, moveOn, decisions } = props;
  const nextIcon = <IconNext style={iconStyle} />;

  const numberOfChoices = decisions.length;
  const numberOfPhotosSeen = numberOfChoices * 2;
  const numberOfPhotosQuicker = 32 - numberOfPhotosSeen;
  const percentagePhotosQuicker = (100 * (32 / numberOfPhotosSeen)).toFixed(0);

  return (
    <div className="cardContainer">
      <Flex {...flexStyle}>
        <FlexItem>
          <Card style={matchCardStyle} className="demoSummaryCard">
            <CardTitle className="cardTitle">Person found!</CardTitle>
            <p>
              <Translate string="demo-summary.message-1" />
              {` ${numberOfChoices}`}
            </p>
            <p>
              <Translate string="demo-summary.message-2" />
              {` ${numberOfPhotosSeen} `}
            </p>
            <CardImage
              className="matchCardImage"
              style={cardImageStyle}
              src={foundPersonDetails.data.img_url}
              alt="gradient placeholder"
            />
            <CardBlock style={cardBlockStyle}>
              <p>
                <Translate string="demo-summary.message-3" />
                32
              </p>
              <p>
                <Translate string="demo-summary.message-4" />
                {` ${numberOfPhotosQuicker}`}
                {` (${percentagePhotosQuicker}% `}
                <Translate string="demo-summary.quicker" />
)
              </p>
            </CardBlock>
            <CardBlock>
              <Button style={buttonStyle} iconStart={nextIcon} onClick={moveOn}>
                <Translate string="button.next" />
              </Button>
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
