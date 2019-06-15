import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './dashboard';

describe('<Dashboard />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toHaveLength(1);
  });
});
