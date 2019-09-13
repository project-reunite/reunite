import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Button from 'mineral-ui/Button';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Translate from '../../../locales/translate';

const { flexStyle } = require('../../../styles/flex-styles');
const { matchCardStyle, cardImageStyle } = require('../../../styles/card-styles');
const { buttonStyle } = require('../../../styles/button-styles');

const nextIcon = <IconNext />;

const aidWorkerContactedPanel = (props) => {
  const { foundPersonDetails, moveOn } = props;
  return (
    <div className="singleCardContainer">
      <Flex {...flexStyle}>
        <FlexItem>
          <Card style={matchCardStyle}>
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
              <p>In a real situation, we would contact an aid worker with this information.</p>
            </CardBlock>
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
      </Flex>
    </div>
  );
};

aidWorkerContactedPanel.defaultProps = {
  foundPersonDetails: {},
  moveOn: () => {},
};

aidWorkerContactedPanel.propTypes = {
  foundPersonDetails: PropTypes.objectOf(PropTypes.string),
  moveOn: PropTypes.func,
};

export default aidWorkerContactedPanel;
