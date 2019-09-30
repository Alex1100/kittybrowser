import React from 'react';
import { KittySearchForm } from '../KittySearchForm';
import { shallow } from 'enzyme';

const handleSubmit = () => {
  return true;
};

const handleChange = (val) => {
  currentKittyQuery = val;
};

const currentKittyQuery = 'hi';

const mockData = {
    handleSubmit,
    handleChange,
    currentKittyQuery,
};

describe('KittySearchForm Test', () => {
  const component = shallow(<KittySearchForm {...mockData} />);

  it(`tests that an onSubmit is included on the form`, () => {
    const inputField = component.find('.text-input-search');
    expect(inputField.props().value).toEqual(currentKittyQuery);
    expect(component.props().children.props.hasOwnProperty('onSubmit')).toEqual(true);
  });
});
