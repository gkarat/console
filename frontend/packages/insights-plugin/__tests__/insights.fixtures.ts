import {
  isWaitingOrDisabled as _isWaitingOrDisabled,
  isError as _isError,
} from '../src/mappers';

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

const propsForInsightsWidget = {
  responses: {
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
  k8sResult: {
    loadError: '',
    loaded: true,
    data: {
      apiVersion: 'config.openshift.io/v1',
      kind: 'ClusterVersion',
      metadata: {
        creationTimestamp: '2021-06-03T08:48:12Z',
        generation: 1,
        managedFields: [
          {
            apiVersion: 'config.openshift.io/v1',
            fieldsType: 'FieldsV1',
            fieldsV1: {
              'f:spec': {
                '.': {},
                'f:clusterID': {},
              },
            },
            manager: 'cluster-bootstrap',
            operation: 'Update',
            time: '2021-06-03T08:48:12Z',
          },
          {
            apiVersion: 'config.openshift.io/v1',
            fieldsType: 'FieldsV1',
            fieldsV1: {
              'f:status': {
                '.': {},
                'f:availableUpdates': {},
                'f:conditions': {},
                'f:desired': {
                  '.': {},
                  'f:image': {},
                  'f:version': {},
                },
                'f:history': {},
                'f:observedGeneration': {},
                'f:versionHash': {},
              },
            },
            manager: 'cluster-version-operator',
            operation: 'Update',
            time: '2021-06-03T08:48:13Z',
          },
        ],
        name: 'version',
        resourceVersion: '29048',
        uid: '0d66597d-e74a-48ba-a83d-1aaf7bc7d68e',
      },
      spec: {
        clusterID: 'd4b48e95-83e8-436c-b2c9-283c05aecc7f',
      },
      status: {
        availableUpdates: null,
        conditions: [
          {
            lastTransitionTime: '2021-06-03T08:48:13Z',
            message: 'The update channel has not been configured.',
            reason: 'NoChannel',
            status: 'False',
            type: 'RetrievedUpdates',
          },
          {
            lastTransitionTime: '2021-06-03T09:13:09Z',
            message: 'Done applying 4.8.0-0.nightly-2021-06-03-022152',
            status: 'True',
            type: 'Available',
          },
          {
            lastTransitionTime: '2021-06-03T09:13:09Z',
            status: 'False',
            type: 'Failing',
          },
          {
            lastTransitionTime: '2021-06-03T09:13:09Z',
            message: 'Cluster version is 4.8.0-0.nightly-2021-06-03-022152',
            status: 'False',
            type: 'Progressing',
          },
        ],
        desired: {
          image:
            'registry.ci.openshift.org/ocp/release@sha256:ae069556048ad5c94aa133caaf84430deddf7d519a6e2537523d1fe21428b875',
          version: '4.8.0-0.nightly-2021-06-03-022152',
        },
        history: [
          {
            completionTime: '2021-06-03T09:13:09Z',
            image:
              'registry.ci.openshift.org/ocp/release@sha256:ae069556048ad5c94aa133caaf84430deddf7d519a6e2537523d1fe21428b875',
            startedTime: '2021-06-03T08:48:13Z',
            state: 'Completed',
            verified: false,
            version: '4.8.0-0.nightly-2021-06-03-022152',
          },
        ],
        observedGeneration: 1,
        versionHash: '2MxFCa5ZK-U=',
      },
    },
    optional: true,
  },
};

const fixtures = {
  propsForInsightsWidget,
};

export default fixtures;
export { funcs };
