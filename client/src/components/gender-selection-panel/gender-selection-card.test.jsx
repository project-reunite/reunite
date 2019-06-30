import React from 'react';
import { shallow } from 'enzyme';
import GenderSelectionPanel from './gender-selection-panel';

describe('<GenderSelectionPanel />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<GenderSelectionPanel />);
    expect(wrapper).toHaveLength(1);
  });
});
