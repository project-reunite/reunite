import React from 'react';
import { shallow } from 'enzyme';
import UploadPicPanel from './upload-pic-panel';

describe('<UploadPicPanel />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<UploadPicPanel />);
    expect(wrapper).toHaveLength(1);
  });
});
