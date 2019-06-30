import React from 'react';
import { shallow } from 'enzyme';
import GeneralCard from './general-card';

describe('<GeneralCard />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<GeneralCard />);
    expect(wrapper).toHaveLength(1);
  });
});
