import React from 'react';
import { shallow } from 'enzyme';
import LanguageSelectionPanel from './language-selection-panel';

describe('<LanguageSelectionPanel />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LanguageSelectionPanel />);
    expect(wrapper).toHaveLength(1);
  });
});
