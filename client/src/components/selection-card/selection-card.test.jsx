import React from 'react';
import { shallow } from 'enzyme';
import SelectionCard from './selection-card';

const props = {
  selection: 'test',
  urls: ['test'],
};

describe('<SelectionCard />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SelectionCard {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
