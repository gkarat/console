import * as _ from 'lodash-es';

import {
  CRDVersion,
  CustomResourceDefinitionKind,
  GroupVersionKind,
  K8sKind,
  K8sResourceCommon,
  K8sResourceKind,
  K8sResourceKindReference,
  OwnerReference,
  modelFor,
} from './index';

export const getQN: (obj: K8sResourceKind) => string = ({ metadata: { name, namespace } }) =>
  (namespace ? `(${namespace})-` : '') + name;

export const k8sBasePath = `${window.SERVER_FLAGS.basePath}api/kubernetes`;

// TODO(alecmerdler): Replace all manual string building with this function
export const referenceForGroupVersionKind = (group: string) => (version: string) => (
  kind: string,
) => [group, version, kind].join('~');

export const getGroupVersionKind = (
  ref: GroupVersionKind | string,
): [string, string, string] | undefined => {
  const parts = ref.split('~');
  if (parts.length !== 3) {
    return undefined;
  }
  return parts as [string, string, string];
};

export const isGroupVersionKind = (ref: GroupVersionKind | string) => ref.split('~').length === 3;

export const groupVersionFor = (apiVersion: string) => ({
  group: apiVersion.split('/').length === 2 ? apiVersion.split('/')[0] : 'core',
  version: apiVersion.split('/').length === 2 ? apiVersion.split('/')[1] : apiVersion,
});

const parseAPIVersion = (version: string) => {
  const parsed = /^v(\d+)(?:(alpha|beta)(\d+))?$/.exec(version);
  return parsed
    ? { majorVersion: Number(parsed[1]), qualifier: parsed[2], minorVersion: Number(parsed[3]) }
    : null;
};

export const crdVersionSort = (crdVersions: CRDVersion[]) => {
  return crdVersions?.sort((v1, v2) => {
    const v1Parsed = parseAPIVersion(v1.name);
    const v2Parsed = parseAPIVersion(v2.name);
    // First sort on major version with no qualifiers: v3 > v1
    if (
      v1Parsed.majorVersion !== v2Parsed.majorVersion &&
      !v1Parsed.qualifier &&
      !v2Parsed.qualifier
    ) {
      return v2Parsed.majorVersion - v1Parsed.majorVersion;
    }
    // Then sort on any version with no qualifier over a qualifier: v1 > v3alpha
    if (_.isEmpty(v1Parsed.qualifier) !== _.isEmpty(v2Parsed.qualifier)) {
      return v1Parsed.qualifier ? 1 : -1;
    }
    // Beta beats alpha: v1beta1 > v1alpha1
    const isBetaV1 = v1Parsed.qualifier === 'beta';
    const isBetaV2 = v2Parsed.qualifier === 'beta';
    if (isBetaV1 !== isBetaV2) {
      return isBetaV1 ? -1 : 1;
    }
    // Same qualifier, then numeric values win: v2beta2 > v1beta2
    if (v1Parsed.majorVersion !== v2Parsed.majorVersion) {
      return v2Parsed.majorVersion - v1Parsed.majorVersion;
    }
    // Finally compare minor version: v1beta2 > v1beta1
    return v2Parsed.minorVersion - v1Parsed.minorVersion;
  });
};

export const getLatestVersionForCRD = (crdVersions: CRDVersion[], legacyCRDVersion: string) => {
  const sorted = crdVersionSort(crdVersions?.filter((version) => version.served));
  return sorted?.[0]?.name || legacyCRDVersion;
};

export const referenceForCRD = (obj: CustomResourceDefinitionKind): GroupVersionKind =>
  referenceForGroupVersionKind(obj.spec.group)(
    getLatestVersionForCRD(obj.spec.versions, obj.spec.version),
  )(obj.spec.names.kind);

export const referenceForOwnerRef = (ownerRef: OwnerReference): GroupVersionKind =>
  referenceForGroupVersionKind(groupVersionFor(ownerRef.apiVersion).group)(
    groupVersionFor(ownerRef.apiVersion).version,
  )(ownerRef.kind);

export const referenceForModel = (model: K8sKind): GroupVersionKind =>
  referenceForGroupVersionKind(model.apiGroup || 'core')(model.apiVersion)(model.kind);

export const referenceFor = ({ kind, apiVersion }: K8sResourceCommon): GroupVersionKind => {
  if (!kind) {
    return '';
  }

  // `apiVersion` is optional in some k8s object references (for instance,
  // event `involvedObject`). The CLI resolves the version from API discovery.
  // Use `modelFor` to get the version from the model when missing.
  if (!apiVersion) {
    const m = modelFor(kind);
    return m ? referenceForModel(m) : '';
  }

  const { group, version } = groupVersionFor(apiVersion);
  return referenceForGroupVersionKind(group)(version)(kind);
};

export const kindForReference = (ref: K8sResourceKindReference) =>
  isGroupVersionKind(ref) ? ref.split('~')[2] : ref;

export const apiGroupForReference = (ref: GroupVersionKind) => ref.split('~')[0];

export const versionForReference = (ref: GroupVersionKind) => ref.split('~')[1];

export const apiVersionForModel = (model: K8sKind) =>
  _.isEmpty(model.apiGroup) ? model.apiVersion : `${model.apiGroup}/${model.apiVersion}`;

export const apiVersionForReference = (ref: GroupVersionKind) =>
  isGroupVersionKind(ref) ? `${ref.split('~')[0]}/${ref.split('~')[1]}` : ref;

export const nameForModel = (model: K8sKind) => [model.plural, model.apiGroup].join('.');
