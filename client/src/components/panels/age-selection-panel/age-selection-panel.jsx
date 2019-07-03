import React from 'react';
import PropTypes from 'prop-types';

import Flex, { FlexItem } from 'mineral-ui/Flex';
import GeneralCard from '../../cards/general-card';
import ages from '../../../utils/ages';

const { flexStyle } = require('../../../styles/flex-styles');

const AgeSelectionPanel = (props) => {
  const { setAge } = props;
  return (
    <div className="selectionPanel">
      <Flex
        wrap
        {...flexStyle}
      >
        <FlexItem>
          <GeneralCard
            title={ages.BABY}
            onClick={() => setAge(ages.BABY)}
            img="baby.svg"
            dataCy={`age-selection-card-${ages.BABY}`}
            imageClassName="ageSelectCardImage"
          />
        </FlexItem>
        <FlexItem>
          <GeneralCard
            title={ages.CHILD}
            onClick={() => setAge(ages.CHILD)}
            img="child.svg"
            dataCy={`age-selection-card-${ages.CHILD}`}
            imageClassName="ageSelectCardImage"
          />
        </FlexItem>
        <FlexItem>
          <GeneralCard
            title={ages.ADULT}
            onClick={() => setAge(ages.ADULT)}
            img="man-icon.svg"
            dataCy={`age-selection-card-${ages.ADULT}`}
            imageClassName="ageSelectCardImage"
          />
        </FlexItem>
        <FlexItem>
          <GeneralCard
            title={ages.ELDERLY}
            onClick={() => setAge(ages.ELDERLY)}
            img="elderly.svg"
            dataCy={`age-selection-card-${ages.ELDERLY}`}
            imageClassName="ageSelectCardImage"
          />
        </FlexItem>
      </Flex>
    </div>
  );
};

AgeSelectionPanel.defaultProps = {
  setAge: () => {},
};

AgeSelectionPanel.propTypes = {
  setAge: PropTypes.func,
};

export default AgeSelectionPanel;
