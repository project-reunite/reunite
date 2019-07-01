import React from 'react';
import { shallow } from 'enzyme';
import NoMatchCard from './no-match-card';

describe('<NoMatchCard />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NoMatchCard />);
    expect(wrapper).toHaveLength(1);
  });
});
