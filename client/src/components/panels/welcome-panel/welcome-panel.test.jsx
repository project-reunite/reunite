import React from 'react';
import { shallow } from 'enzyme';
import WelcomePanel from './welcome-panel';

describe('<WelcomePanel />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<WelcomePanel />);
    expect(wrapper).toHaveLength(1);
  });
});
