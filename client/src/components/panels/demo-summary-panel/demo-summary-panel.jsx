import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import Flex from 'mineral-ui/Flex/Flex';

import IconSuccess from 'mineral-ui-icons/IconSuccess';
import Button from 'mineral-ui/Button';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { flexStyle } = require('../../../styles/flex-styles');
const { nextButtonStyle, buttonStyle } = require('../../../styles/button-styles');

const { nextIconStyle, iconStyle } = require('../../../styles/icon-styles');

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
            <CardImage
              style={cardImageStyle}
              className="matchCardImage"
              src={foundPersonDetails.data.img_url}
              alt="gradient placeholder"
            />
            <CardBlock style={cardBlockStyle}>
              You found your person in
              {` ${numberOfChoices} `}
              steps, which is
              {` ${numberOfPhotosSeen} `}
              photos. It would have taken an average of 32 photos to find them by scrolling through
              each photo one-by-one. So you found them in
              {` ${numberOfPhotosQuicker} `}
              photos quicker, or
              {` ${percentagePhotosQuicker} `}
              %.
            </CardBlock>
            <CardBlock>
              <Button style={buttonStyle} iconStart={nextIcon} onClick={moveOn}>
                Next
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
