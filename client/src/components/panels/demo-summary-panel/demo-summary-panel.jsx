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
const {
  numMissingPeople,
  numPhotosViaExistingSolutions,
} = require('../../../config');

const DemoSummaryPanel = (props) => {
  const { foundPersonDetails, moveOn, decisions } = props;
  const nextIcon = <IconNext style={iconStyle} />;

  const numChoices = decisions.length;
  const numPhotosSeen = numChoices * 2;
  const numPhotosQuicker = numPhotosViaExistingSolutions - numPhotosSeen;

  return (
    <div className="singleCardContainer">
      <Flex {...flexStyle}>
        <FlexItem>
          <Card style={matchCardStyle} className="demoSummaryCard">
            <CardTitle className="cardTitle">
              <Translate string="demo-summary.title" />
            </CardTitle>
            <CardImage
              className="cardImage"
              style={cardImageStyle}
              src={foundPersonDetails.data.img_url}
              alt="gradient placeholder"
            />
            <p>
              {`${numPhotosSeen} `}
              <Translate string="demo-summary.message-2" />
            </p>
            <CardBlock style={cardBlockStyle}>
              <p>
                {`${numPhotosQuicker} `}
                <Translate string="demo-summary.message-4" />
                {` (${numPhotosViaExistingSolutions})`}
              </p>
            </CardBlock>
            <CardBlock>
              <Button className="cardButton" style={buttonStyle} iconStart={nextIcon} onClick={moveOn}>
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
