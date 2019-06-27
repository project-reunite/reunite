import React from 'react';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import GeneralCard from '../general-card';

const { flexStyle } = require('../../styles/flex-styles');
const { smallCardStyle } = require('../../styles/card-styles');

const UploadPicPanel = (props) => {
  const { moveOn } = props;
  return (
    <div className="cardContainer" data-cy="upload-pic-card">
      <Flex
        wrap
        {...flexStyle}
      >
        <FlexItem data-cy="picture-button">
          <GeneralCard onClick={() => console.log('upload picture')} inputCardStyle={smallCardStyle} imageClassName="smallerCardImage" title="Photo" img="photo.svg" />
        </FlexItem>
        <FlexItem data-cy="no-picture-button">
          <GeneralCard onClick={moveOn} inputCardStyle={smallCardStyle} imageClassName="smallerCardImage" title="No Photo" img="no-photo.svg" />
        </FlexItem>
      </Flex>
    </div>
  );
};

UploadPicPanel.defaultProps = {
  moveOn: () => console.log('moveOn prop not found'),
};

UploadPicPanel.propTypes = {
  moveOn: PropTypes.func,
};

export default UploadPicPanel;
