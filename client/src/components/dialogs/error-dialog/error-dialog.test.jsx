import React from 'react';
import { shallow } from 'enzyme';
import ErrorDialog from './error-dialog';

describe('<ErrorDialog />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ErrorDialog />);
    expect(wrapper).toHaveLength(1);
  });
});
