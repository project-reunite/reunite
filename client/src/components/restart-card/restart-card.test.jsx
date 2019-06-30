import React from 'react';
import { shallow } from 'enzyme';
import RestartCard from './restart-card';

describe('<RestartCard />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RestartCard />);
    expect(wrapper).toHaveLength(1);
  });
});
