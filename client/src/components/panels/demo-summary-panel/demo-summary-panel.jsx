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
          <Card style={matchCardStyle}>
            <CardTitle className="cardTitle">Person found!</CardTitle>
            <p>
              Number of steps to find your person:
              {` ${numberOfChoices}`}
            </p>
            <p>
              Number of photos viewed:
              {` ${numberOfPhotosSeen} `}
            </p>
            <CardImage
              style={cardImageStyle}
              className="matchCardImage"
              src={foundPersonDetails.data.img_url}
              alt="gradient placeholder"
            />
            <CardBlock style={cardBlockStyle}>
              <p>
                Average number of photos to find them by scrolling through each one-by-one: 32
              </p>
              <p>
                So, the number of photos fewer you had to scroll through:
                {` ${numberOfPhotosQuicker}`}
                {` (${percentagePhotosQuicker}% `}
                quicker)
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

DemoSummaryPanel.propTypes = {};

export default DemoSummaryPanel;
