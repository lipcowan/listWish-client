import React from 'react';
import { shallow } from 'enzyme';
import ListForm from './ListForm';
it('renders without crashing', () => {
  shallow(<ListForm />);
});