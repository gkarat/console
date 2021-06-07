import { PrometheusHealthPopupProps } from '@console/plugin-sdk';

const funcs = () => ({
  history: {
    push: jest.fn(),
  },
  location: {
    hash: '',
  },
  PrometheusHealthPopupProps: jest.fn(),
  K8sResourceKind: jest.fn(),
  mapMetrics: jest.fn(),
  _isWaitingOrDisabled: jest.fn(),
  _isError: jest.fn(),
  useTranslation: jest.fn(),
});

const propsForInsightsWidget: PrometheusHealthPopupProps = {
  responses: [
    {
      response: {
        status: 'success',
        data: {
          resultType: 'vector',
          result: [
            {
              metric: {
                __name__: 'health_statuses_insights',
                container: 'insights-operator',
                endpoint: 'https',
                instance: '10.128.0.5:8443',
                job: 'metrics',
                metric: 'critical',
                namespace: 'openshift-insights',
                pod: 'insights-operator-7b5d69cd76-2nkvj',
                prometheus: 'openshift-monitoring/k8s',
                service: 'metrics',
              },
              value: [1622715672.165, '0'],
            },
            {
              metric: {
                __name__: 'health_statuses_insights',
                container: 'insights-operator',
                endpoint: 'https',
                instance: '10.128.0.5:8443',
                job: 'metrics',
                metric: 'important',
                namespace: 'openshift-insights',
                pod: 'insights-operator-7b5d69cd76-2nkvj',
                prometheus: 'openshift-monitoring/k8s',
                service: 'metrics',
              },
              value: [1622715672.165, '0'],
            },
            {
              metric: {
                __name__: 'health_statuses_insights',
                container: 'insights-operator',
                endpoint: 'https',
                instance: '10.128.0.5:8443',
                job: 'metrics',
                metric: 'low',
                namespace: 'openshift-insights',
                pod: 'insights-operator-7b5d69cd76-2nkvj',
                prometheus: 'openshift-monitoring/k8s',
                service: 'metrics',
              },
              value: [1622715672.165, '0'],
            },
            {
              metric: {
                __name__: 'health_statuses_insights',
                container: 'insights-operator',
                endpoint: 'https',
                instance: '10.128.0.5:8443',
                job: 'metrics',
                metric: 'moderate',
                namespace: 'openshift-insights',
                pod: 'insights-operator-7b5d69cd76-2nkvj',
                prometheus: 'openshift-monitoring/k8s',
                service: 'metrics',
              },
              value: [1622715672.165, '1'],
            },
          ],
        },
      },
      error: null,
    },
  ],
  k8sResult: {
    loadError: '',
    loaded: true,
    data: {
      spec: {
        clusterID: 'd4b48e95-83e8-436c-b2c9-283c05aecc7f',
      },
    },
  },
};

const fixtures = {
  propsForInsightsWidget,
};

export default fixtures;
export { funcs };
