import React from 'react';
import { shallow } from 'enzyme';
import MainAppScreen from './main-app-screen';
import apiRequests from '../../../utils/apiRequests';

const mockedTree = {
  data: {
    docs: [
      {
        initialDecisionId: '12',
      },
    ],
  },
};

describe('<Main App Screen />', () => {
  beforeAll(() => {
    apiRequests.getTree = jest.fn().mockImplementation(() => Promise.resolve({
      mockedTree,
    }));
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<MainAppScreen />);
    expect(wrapper).toHaveLength(1);
  });
});
