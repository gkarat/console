import * as React from 'react';
import { shallow } from 'enzyme';

import { InsightsPopup } from '../src/components/InsightsPopup';
import AdvisorChart from '../src/components/AdvisorChart';
import fixtures from './insightsPlugin.fixtures';

describe('Insights plugin', () => {
  describe('<InsightsPopup /> OK state', () => {
    const wrapper = shallow(<InsightsPopup {...fixtures.propsInsightsPopup} />);

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders main content component', () => {
      expect(wrapper.find('.co-insights__box').length).toBe(1);
    });
    it('should have header', () => {
      expect(wrapper.find('#insights-plugin--header').text()).toBe(
        'Insights Advisor identifies and prioritizes risks to security, performance, availability, and stability of your clusters.',
      );
    });
    it('should render chart', () => {
      expect(wrapper.find(AdvisorChart).length).toBe(1);
    });
  });

  describe('<InsightsPopup /> error state', () => {
    const { responses } = fixtures.propsInsightsPopup;
    responses[0].response.data.result = [];
    const props = {
      ...fixtures,
      responses,
    };
    const wrapper = shallow(<InsightsPopup {...props} />);

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders main content component', () => {
      expect(wrapper.find('.co-insights__box').length).toBe(1);
    });
    it('should have header', () => {
      expect(wrapper.find('#insights-plugin--header').text()).toBe(
        'Insights Advisor identifies and prioritizes risks to security, performance, availability, and stability of your clusters.',
      );
    });
    it('should have error text message', () => {
      expect(wrapper.find('.co-status-popup__section.text-secondary').text()).toBe(
        'Temporary unavailable.',
      );
    });
  });

  describe('<InsightsPopup /> disabled state', () => {
    const wrapper = shallow(<InsightsPopup {...fixtures.propsInsightsPopupDisabled} />);

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders main content component', () => {
      expect(wrapper.find('.co-insights__box').length).toBe(1);
    });
    it('should have header', () => {
      expect(wrapper.find('#insights-plugin--header').text()).toBe(
        'Insights Advisor identifies and prioritizes risks to security, performance, availability, and stability of your clusters.',
      );
    });
    it('should have error text message', () => {
      expect(wrapper.find('.co-status-popup__section.text-secondary').text()).toBe(
        'Disabled or waiting for results.',
      );
    });
  });
});
