import React from 'react';
import { shallow } from 'enzyme';
import MatchCard from './match-card';

describe('<MatchCard />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<MatchCard />);
    expect(wrapper).toHaveLength(1);
  });
});
