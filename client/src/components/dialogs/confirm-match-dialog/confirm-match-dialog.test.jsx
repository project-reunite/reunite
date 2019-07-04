import React from 'react';
import { shallow } from 'enzyme';
import ConfirmMatchDialog from './confirm-match-dialog';

describe('<ConfirmMatchDialog />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ConfirmMatchDialog />);
    expect(wrapper).toHaveLength(1);
  });
});
