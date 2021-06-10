import * as React from 'react';
import { shallow } from 'enzyme';
import { InsightsPopup } from '../src/components/InsightsPopup/index';
import fixtures from './insights.fixtures';

describe('InsightsPopup ', () => {
  const props = {
    ...fixtures,
    responses: { ...fixtures.propsInsightsPopup.responses },
    k8sResult: { ...fixtures.propsInsightsPopup.k8sResult },
  };

  const wrapper = shallow(<InsightsPopup {...props} />);
  it('main container renders correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should have the correct error component', () => {
    expect(wrapper.find('.co-insights__box').length).toBe(1);
  });

  it('should have correct text inside .co-insights__box', () => {
    expect(wrapper.find('.insights-widget-text-enabled').text()).toBe(
      'Insights Advisor identifies and prioritizes risks to security, performance, availability, and stability of your clusters',
    );
  });

  it('should render component co-status-popup__section', () => {
    expect(wrapper.find('.co-status-popup__section'));
  });
});

describe('InsightsPopup error state', () => {
  const { responses } = fixtures.propsInsightsPopup;
  responses[0].response.data.result = [];
  const props = {
    ...fixtures,
    responses,
  };
  const wrapper = shallow(<InsightsPopup {...props} />);

  it('renders the error component correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
  it('should have the correct error component', () => {
    expect(wrapper.find('.co-status-popup__section-text-secondary').length).toBe(1);
  });
  it('should have correct text inside co-status-popup__section-text-secondary', () => {
    expect(wrapper.find('.insights-widget-text-error').text()).toBe('Temporary unavailable.');
  });
});

describe('InsightsPopup disabled state', () => {
  const props = {
    ...fixtures,
    responses: {
      ...fixtures.propsInsightsPopup.responses,
      response: {
        ...fixtures.propsInsightsPopup.responses[0].response,
        data: {
          ...fixtures.propsInsightsPopup.responses[0].response.data,
          result: {
            ...fixtures.propsInsightsPopup.responses[0].response.data.result,
            0: { value: [1622715672.165, '-1'] },
            1: { value: [1622715672.165, '-1'] },
            2: { value: [1622715672.165, '-1'] },
            3: { value: [1622715672.165, '-1'] },
          },
        },
      },
    },
    k8sResult: { ...fixtures.propsInsightsPopup.k8sResult },
  };
  const wrapper = shallow(<InsightsPopup {...props} />);

  it('renders the isWaitingOrDisabled component correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
  it('should have the correct disabled component', () => {
    expect(wrapper.find('.co-status-popup__section-text-secondary').length).toBe(1);
  });
  it('should have correct text inside co-status-popup__section-text-secondary', () => {
    expect(wrapper.find('.insights-widget-text-disabled').text()).toBe(
      'Disabled or waiting for results.',
    );
  });
});
