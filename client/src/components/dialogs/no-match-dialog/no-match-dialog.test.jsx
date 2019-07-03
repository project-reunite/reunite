import React from 'react';
import { shallow } from 'enzyme';
import NoMatchDialog from './no-match-dialog';

describe('<NoMatchDialog  />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NoMatchDialog />);
    expect(wrapper).toHaveLength(1);
  });
});
