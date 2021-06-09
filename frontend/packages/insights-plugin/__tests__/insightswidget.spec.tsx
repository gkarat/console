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
  it('should have the correct error component', () => {
    expect(wrapper.find('.co-insights__box'));
  });
  it('should have correct text inside co-insights__box', () => {
    expect(wrapper.find('.insights-widget-text-enabled').text()).toBe(
      'Insights Advisor identifies and prioritizes risks to security, performance, availability, and stability of your clusters',
    );
  });
});

describe('InsightsPopup error state', () => {
  const functions = funcs();
  const props = {
    ...functions,
    ...fixtures,
    responses: { ...fixtures.propsForInsightsWidget.responses },
    k8sResult: { ...fixtures.propsForInsightsWidget.k8sResult },
    isError: true,
  };
  const wrapper = mount(<InsightsPopup {...props} />);

  it('renders the error component correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
  it('should have the correct error component', () => {
    expect(wrapper.find('.co-status-popup__section text-secondary'));
  });
  it('should have correct text inside co-insights__box', () => {
    expect(wrapper.find('.insights-widget-text-error').text()).toBe('Temporary unavailable.');
  });
});

describe('InsightsPopup disabled state', () => {
  const functions = funcs();
  const props = {
    ...functions,
    ...fixtures,
    responses: { ...fixtures.propsForInsightsWidget.responses },
    k8sResult: { ...fixtures.propsForInsightsWidget.k8sResult },
    isWaitingOrDisabled: true,
  };
  const wrapper = mount(<InsightsPopup {...props} />);

  it('renders the isWaitingOrDisabled component correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
  it('should have the correct disabled component', () => {
    expect(wrapper.find('.co-status-popup__section text-secondary'));
  });
  it('should have correct text inside co-insights__box', () => {
    expect(wrapper.find('.insights-widget-text-disabled').text()).toBe(
      'Disabled or waiting for results.',
    );
  });
});
