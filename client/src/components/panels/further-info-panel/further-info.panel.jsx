import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import Flex from 'mineral-ui/Flex/Flex';
import IconVideo from 'mineral-ui-icons/IconOndemandVideo';
import IconEye from 'mineral-ui-icons/IconVisibility';
import Button from 'mineral-ui/Button';

import Translate from '../../../locales/translate';

const { matchCardStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { flexStyle } = require('../../../styles/flex-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

const FurtherInfoPanel = () => (
  <div className="cardContainer">
    <Flex {...flexStyle}>
      <FlexItem>
        <Card style={matchCardStyle}>
          <CardTitle className="cardTitle">
            <Translate string="further-info.title" />
          </CardTitle>
          <CardBlock>
            <CardImage className="cardImage" src="reunite-dark.svg" alt="gradient placeholder" />
          </CardBlock>
          <CardBlock style={cardBlockStyle}>
            <p>
              <Translate string="further-info.message-1" />
            </p>
            <p>
              <Translate string="further-info.message-2" />
            </p>
          </CardBlock>
          <CardBlock>
            <a href="https://github.ibm.com/ProjectReunite/reunite">
              <Button iconStart={<IconVideo style={iconStyle} />} style={buttonStyle}>
                <Translate string="further-info.more-information" />
              </Button>
            </a>
          </CardBlock>
          <CardBlock>
            <a href="https://www.bbc.co.uk/sport">
              <Button iconStart={<IconEye style={iconStyle} />} style={buttonStyle}>
                <Translate string="further-info.link-to-cfc" />
              </Button>
            </a>
          </CardBlock>
        </Card>
      </FlexItem>
    </Flex>
  </div>
);

FurtherInfoPanel.propTypes = {};

export default FurtherInfoPanel;
