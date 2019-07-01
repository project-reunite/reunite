import React from 'react';
import { shallow } from 'enzyme';
import PersonSelectionPanel from './person-selection-panel';
import apiRequests from '../../../utils/apiRequests';

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

describe('<PersonSelectionPanel />', () => {
  beforeAll(() => {
    apiRequests.getChoices = jest.fn().mockImplementation(() => Promise.resolve({
      mockedDecision,
    }));
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<PersonSelectionPanel {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
