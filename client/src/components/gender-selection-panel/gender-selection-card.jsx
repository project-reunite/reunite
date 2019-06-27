import React from 'react';

import Flex, { FlexItem } from 'mineral-ui/Flex';
import GeneralCard from '../general-card';
import genders from '../../utils/genders';

const { flexStyle } = require('../../styles/flex-styles');

const GenderSelectionPanel = (props) => {
  const { setGender } = props;
  return (
    <div className="selectionPanel">
      <Flex
        wrap
        {...flexStyle}
      >
        <FlexItem>
          <GeneralCard
            onClick={() => setGender(genders.MALE)}
            title={genders.MALE}
            img="man-icon.svg"
            dataCy={`gender-selection-card-${genders.MALE}`}
            imageClassName="genderSelectCardImage"
          />
        </FlexItem>
        <FlexItem>
          <GeneralCard
            onClick={() => setGender(genders.FEMALE)}
            title={genders.FEMALE}
            img="woman-icon.svg"
            dataCy={`gender-selection-card-${genders.FEMALE}`}
            imageClassName="genderSelectCardImage"
          />
        </FlexItem>
      </Flex>
    </div>
  );
};

export default GenderSelectionPanel;
