import React from 'react';
import { shallow } from 'enzyme';
import Deck from './deck';
import apiRequests from '../../utils/apiRequests';

const props = {
  startingDecisionID: '0',
};

const mockedDecision = {
  data: {
    choices: [
      {
        persons_id: '1',
        next_decision_id: '2',
      },
      {
        persons_id: '3',
        next_decision_id: '4',
      },
    ],
  },
};

describe('<Deck />', () => {
  beforeAll(() => {
    apiRequests.getChoices = jest.fn().mockImplementation(() => Promise.resolve({
      mockedDecision,
    }));
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<Deck {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
