import React from 'react';
import { shallow } from 'enzyme';
import Deck from './deck';

describe('<Deck />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Deck />);
    expect(wrapper).toHaveLength(1);
  });
});
