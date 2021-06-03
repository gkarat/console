import React from 'react';
import { shallow } from 'enzyme';
import { useTranslation } from 'react-i18next';

import { InsightsPopup } from '../src/components/InsightsPopup/index';

describe('InsightsPopup ', () => {
  const props = {
    PrometheusHealthPopupProps: {
      responses: {
        container: 'insights-operator',
        endpoint: 'https',
        instance: '10.129.0.5:8443',
        job: 'metrics',
        metric: 'critical',
        namespace: 'openshift-insights',
        pod: 'insights-operator-c7877d6df-4w2mf',
        prometheus: 'openshift-monitoring/k8s',
        service: 'metrics',
        __name__: 'health_statuses_insights',
      },
      error: false,
    },
    i: useTranslation(),
    metrics: { critical: 0, important: 0, low: 0, moderate: 1 },
    clusterID: `c9b69e7e-3970-494e-ad09-6d57faad7daf`,
    isWaitingOrDisabled: false,
    isError: false,
  };
  const wrapper = shallow(<InsightsPopup {...props} />);
  it('main container renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('InsightsPopup ', () => {
  const props = {
    i: useTranslation(),
    metrics: { critical: 0, important: 0, low: 0, moderate: 1 },
    clusterID: `c9b69e7e-3970-494e-ad09-6d57faad7daf`,
    isWaitingOrDisabled: false,
    isError: true,
  };
  const wrapper = shallow(<InsightsPopup {...props} />);
  it('render the correct popup if response status is isError ', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('InsightsPopup ', () => {
  const props = {
    i: useTranslation(),
    metrics: { critical: 0, important: 0, low: 0, moderate: 1 },
    clusterID: `c9b69e7e-3970-494e-ad09-6d57faad7daf`,
    isWaitingOrDisabled: true,
    isError: false,
  };
  const wrapper = shallow(<InsightsPopup {...props} />);
  it('render the correct popup if response status is isWaitingOrDisabled = true ', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
