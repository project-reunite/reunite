import React from 'react';
import { shallow } from 'enzyme';
import MatchCard from './match-card';
import apiRequests from '../../../utils/apiRequests';

const mockedPerson = {
  data: {
    name: 'John Smith',
    'img-url': '/images/J-Smith.jpg',
  },
};

describe('<MatchCard />', () => {
  beforeAll(() => {
    apiRequests.getPerson = jest.fn().mockImplementation(() => Promise.resolve({
      mockedPerson,
    }));
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<MatchCard />);
    expect(wrapper).toHaveLength(1);
  });
});
