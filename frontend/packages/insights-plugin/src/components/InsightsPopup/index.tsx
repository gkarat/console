import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PrometheusHealthPopupProps } from '@console/plugin-sdk';
import { K8sResourceKind } from '@console/internal/module/k8s';
import { ExternalLink, openshiftHelpBase } from '@console/internal/components/utils';

import AdvisorChart from '../AdvisorChart';
import {
  mapMetrics,
  isWaitingOrDisabled as _isWaitingOrDisabled,
  isError as _isError,
} from '../../mappers';
import './style.scss';

export const InsightsPopup: React.FC<PrometheusHealthPopupProps> = ({ responses, k8sResult }) => {
  const { t } = useTranslation();
  const metrics = mapMetrics(responses[0].response);
  const clusterId = (k8sResult as K8sResourceKind)?.data?.spec?.clusterId || '';
  const isWaitingOrDisabled = _isWaitingOrDisabled(metrics);
  const isError = _isError(metrics);

  return (
    <div className="co-insights__box">
      <p className="insights-widget-text-enabled">
        {t(
          'insights-plugin~Insights Advisor identifies and prioritizes risks to security, performance, availability, and stability of your clusters.',
        )}
      </p>
      {isError && (
        <div className="co-status-popup__section text-secondary">
          <p className="insights-widget-text-error">
            {t('insights-plugin~Temporary unavailable.')}
          </p>
        </div>
      )}
      {isWaitingOrDisabled && (
        <div className="co-status-popup__section text-secondary">
          <p className="insights-widget-text-disabled">
            {t('insights-plugin~Disabled or waiting for results.')}
          </p>
        </div>
      )}
      {!isWaitingOrDisabled && !isError && <AdvisorChart metrics={metrics} clusterId={clusterId} />}
      <div className="co-status-popup__section">
        {!isWaitingOrDisabled && !isError && clusterId && (
          <>
            <h6 className="pf-c-title pf-m-md">{t('insights-plugin~Fixable issues')}</h6>
            <ExternalLink
              href={`https://cloud.redhat.com/openshift/details/${clusterId}#insights`}
              text={t('insights-plugin~View all in OpenShift Cluster Manager')}
            />
          </>
        )}
        {!isWaitingOrDisabled && !isError && !clusterId && (
          <ExternalLink
            href={`https://cloud.redhat.com/openshift/`}
            text={t('insights-plugin~Go to OpenShift Cluster Manager')}
          />
        )}
        {(isWaitingOrDisabled || isError) && (
          <ExternalLink
            href={`${openshiftHelpBase}support/remote_health_monitoring/using-insights-to-identify-issues-with-your-cluster.html`}
            text={t('insights-plugin~More about Insights')}
          />
        )}
      </div>
    </div>
  );
};

InsightsPopup.displayName = 'InsightsPopup';
