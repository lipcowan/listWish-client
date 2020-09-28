import React from 'react';
import { shallow } from 'enzyme';
import WishForm from './WishForm';
it('renders without crashing', () => {
  shallow(<WishForm />);
});