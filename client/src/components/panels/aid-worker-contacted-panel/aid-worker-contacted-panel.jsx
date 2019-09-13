import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Translate from '../../../locales/translate';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { buttonStyle } = require('../../../styles/button-styles');

const nextIcon = <IconNext />;

const aidWorkerContactedPanel = (props) => {
  const { foundPersonDetails, moveOn } = props;
  return (
    <div className="singleCardContainer">
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
          <Button className="cardButton" style={buttonStyle} iconStart={nextIcon} onClick={moveOn}>
            <Translate string="button.next" />
          </Button>
        </CardBlock>
      </Card>
    </div>
  );
};

aidWorkerContactedPanel.propTypes = {};

export default aidWorkerContactedPanel;
