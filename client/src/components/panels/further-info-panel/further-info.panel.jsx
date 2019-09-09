import React from 'react';

import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import Flex from 'mineral-ui/Flex/Flex';
import IconModeComment from 'mineral-ui-icons/IconModeComment';
import IconCheckCircle from 'mineral-ui-icons/IconCheckCircle';
import IconHelp from 'mineral-ui-icons/IconHelp';
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
          </CardBlock>
          <CardBlock>
            <a href="https://github.ibm.com/ProjectReunite/reunite/issues/new/choose">
              <Button iconStart={<IconModeComment style={iconStyle} />} style={buttonStyle}>
                <Translate string="further-info.feedback" />
              </Button>
            </a>
          </CardBlock>
          <CardBlock>
            <a href="https://github.ibm.com/ProjectReunite/reunite#project-reunite">
              <Button iconStart={<IconHelp style={iconStyle} />} style={buttonStyle}>
                <Translate string="further-info.more-information" />
              </Button>
            </a>
          </CardBlock>
          <CardBlock>
            <a href="https://w3.ibm.com/w3publisher/cognitive-applications/updates-from-bob/a7222250-cf31-11e9-8f65-2d7c559e6321">
              <Button iconStart={<IconCheckCircle style={iconStyle} />} style={buttonStyle}>
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
