import React from 'react';
import { shallow } from 'enzyme';
import PersonCard from './person-card';

const props = {
  name: 'John',
  age: '30',
  gender: 'male',
  img: 'img-mock',
  onClick: jest.fn(),
};

describe('<PersonCard />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<PersonCard {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
