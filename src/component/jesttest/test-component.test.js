import React from 'react';
import { shallow } from 'enzyme';
import TestComponent from './test-component';
describe('ProfilePanel', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<TestComponent value='abc'/>);
  
    expect(component).toMatchSnapshot();
  });
});