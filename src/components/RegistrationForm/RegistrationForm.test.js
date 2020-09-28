import React from 'react';
import { shallow } from 'enzyme';
import RegistrationForm from './RegistrationForm';
it('renders without crashing', () => {
  shallow(<RegistrationForm />);
});