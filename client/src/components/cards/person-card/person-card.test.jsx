import React from 'react';
import { shallow } from 'enzyme';
import PersonCard from './person-card';
import apiRequests from '../../../utils/apiRequests';

const props = {
  id: 'John',
  age: '30',
  onClick: jest.fn(),
};


const mockedPerson = {
  data: {
    name: 'John Smith',
    'img-url': '/images/J-Smith.jpg',
  },
};

describe('<PersonCard />', () => {
  beforeAll(() => {
    apiRequests.getPerson = jest.fn().mockImplementation(() => Promise.resolve({
      mockedPerson,
    }));
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<PersonCard {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
