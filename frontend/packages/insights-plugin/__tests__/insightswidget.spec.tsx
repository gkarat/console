import * as React from 'react';
import { mount } from 'enzyme';
import { InsightsPopup } from '../src/components/InsightsPopup/index';
import fixtures, { funcs } from './insights.fixtures';


describe('InsightsPopup ', () => {
  const functions = funcs();

  const wrapper = mount(<InsightsPopup {...fixtures} {...functions} />);
  it('main container renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('render the correct popup if response status is isError ', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('render the correct popup if response status is isWaitingOrDisabled = true ', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
