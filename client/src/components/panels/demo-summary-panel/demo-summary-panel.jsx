import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import Flex from 'mineral-ui/Flex/Flex';

import IconSuccess from 'mineral-ui-icons/IconSuccess';
import Button from 'mineral-ui/Button';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { flexStyle } = require('../../../styles/flex-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

const DemoSummaryPanel = (props) => {
  const { foundPersonDetails } = props;
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
              You found your person in A steps, which is B photos. It would have taken an average of
              32 photos to find them by scrolling through each photo one-by-one. So you found them
              in D photos quicker, or E%.
            </CardBlock>
            <CardBlock>
              <Button
                style={buttonStyle}
                onClick={() => alert('next')}
                iconStart={<IconSuccess style={iconStyle} />}
              >
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
