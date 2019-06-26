import React from 'react';

import Flex, { FlexItem } from 'mineral-ui/Flex';
import GeneralCard from '../general-card';
import ages from '../../utils/ages';

const { flexStyle } = require('../../styles/flex-styles');

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
            onClick={() => console.log('baby tree')}
            img="baby.svg"
            dataCy={`age-selection-card-${ages.BABY}`}
            imageClassName="ageSelectCardImage"
          />
        </FlexItem>
        <FlexItem>
          <GeneralCard
            title={ages.CHILD}
            onClick={() => console.log('child')}
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

export default AgeSelectionPanel;
