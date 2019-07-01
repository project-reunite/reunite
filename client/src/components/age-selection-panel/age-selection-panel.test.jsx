import React from 'react';
import { shallow } from 'enzyme';
import AgeSelectionPanel from './age-selection-panel';

describe('<AgeSelectionPanel />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<AgeSelectionPanel />);
    expect(wrapper).toHaveLength(1);
  });
});
