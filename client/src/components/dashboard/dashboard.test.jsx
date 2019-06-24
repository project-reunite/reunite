import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './dashboard';
import apiRequests from '../../utils/apiRequests';

const mockedTree = {
  data: {
    docs: [
      {
        initialDecisionId: '12',
      },
    ],
  },
};

describe('<Dashboard />', () => {
  beforeAll(() => {
    apiRequests.getTree = jest.fn().mockImplementation(() => Promise.resolve({
      mockedTree,
    }));
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toHaveLength(1);
  });
});
