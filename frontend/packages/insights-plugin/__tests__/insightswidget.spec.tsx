import * as React from 'react';
import { mount } from 'enzyme';
import { InsightsPopup } from '../src/components/InsightsPopup/index';
import fixtures, { funcs } from './insights.fixtures';

describe('InsightsPopup ', () => {
  const functions = funcs();
  const props = {
    ...functions,
    ...fixtures,
    responses: { ...fixtures.propsForInsightsWidget.responses },
    k8sResult: { ...fixtures.propsForInsightsWidget.k8sResult },
  };

  const wrapper = mount(<InsightsPopup {...props} />);
  it('main container renders correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});

describe('InsightsPopup', () => {
  const functions = funcs();
  const props = {
    ...functions,
    ...fixtures,
    responses: { ...fixtures.propsForErrorInsightsWidget.responses },
    k8sResult: { ...fixtures.propsForErrorInsightsWidget.k8sResult },
  };
  const wrapper = mount(<InsightsPopup {...props} />);

  it('renders the error component correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
  it('should have the correct error component', () => {
    expect(wrapper.find('.co-status-popup__section text-secondary'));
  });
});
