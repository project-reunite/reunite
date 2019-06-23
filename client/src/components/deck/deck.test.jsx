import React from 'react';
import { shallow } from 'enzyme';
import Deck from './deck';

const props = {
  startingDecisionID: '0',
};

describe('<Deck />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Deck {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
