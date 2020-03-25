import * as React from 'react';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';
import { iGetIsLoaded, iGetLoadedData } from '../../../../utils/immutable';
import { FormFieldRow } from '../../form/form-field-row';
import { FormField, FormFieldType } from '../../form/form-field';
import { ignoreCaseSort } from '../../../../utils/sort';
import { VMSettingsField } from '../../types';
import {
  NO_TEMPLATE,
  NO_TEMPLATE_AVAILABLE,
  SELECT_TEMPLATE,
  NO_OPENSHIFT_TEMPLATES,
} from '../../strings/strings';
import { nullOnEmptyChange } from '../../utils/utils';
import { iGetName } from '../../selectors/immutable/selectors';
import { iGetFieldValue } from '../../selectors/immutable/vm-settings';

export const UserTemplates: React.FC<UserTemplatesProps> = React.memo(
  ({
    userTemplateField,
    userTemplateName,
    userTemplates,
    commonTemplates,
    onChange,
    openshiftFlag,
  }) => {
    const data = iGetLoadedData(userTemplates);
    const names: string[] =
      data &&
      data
        .toIndexedSeq()
        .toArray()
        .map(iGetName);
    const sortedNames = ignoreCaseSort(names);
    const hasUserTemplates = sortedNames.length > 0;
    const hasFieldValue = typeof iGetFieldValue(userTemplateField) === 'undefined';

    const optionUserTemplate = (
      <>
        <FormSelectOption
          key={userTemplateName}
          value={userTemplateName}
          label={userTemplateName}
        />
      </>
    );

    const optionNoTemplate = (
      <>
        <FormSelectOption
          key={SELECT_TEMPLATE}
          value=""
          label={SELECT_TEMPLATE}
          isDisabled={!hasFieldValue}
        />
        <FormSelectOption key={NO_TEMPLATE} value="" label={NO_TEMPLATE} />
      </>
    );

    const optionNoTemplatesAvailable = (
      <FormSelectOption
        key={NO_TEMPLATE_AVAILABLE}
        value=""
        label={openshiftFlag ? NO_TEMPLATE_AVAILABLE : NO_OPENSHIFT_TEMPLATES}
      />
    );

    const optionsList = sortedNames.map((name) => (
      <FormSelectOption key={name} value={name} label={name} />
    ));

    return (
      <FormFieldRow
        field={userTemplateField}
        fieldType={FormFieldType.SELECT}
        loadingResources={
          openshiftFlag
            ? {
                userTemplates,
                commonTemplates,
              }
            : {}
        }
      >
        <FormField isDisabled={!hasUserTemplates || userTemplateName !== ''}>
          <FormSelect onChange={nullOnEmptyChange(onChange, VMSettingsField.USER_TEMPLATE)}>
            {userTemplateName && optionUserTemplate}
            {!userTemplateName && hasUserTemplates && optionNoTemplate}
            {!userTemplateName && !hasUserTemplates && optionNoTemplatesAvailable}
            {!userTemplateName && optionsList}
          </FormSelect>
        </FormField>
      </FormFieldRow>
    );
  },
  (prevProps, nextProps) =>
    iGetIsLoaded(prevProps.commonTemplates) === iGetIsLoaded(nextProps.commonTemplates) && // wait for commonTemplates; required when pre-filling template
    prevProps.userTemplateField === nextProps.userTemplateField &&
    prevProps.userTemplates === nextProps.userTemplates &&
    prevProps.openshiftFlag === nextProps.openshiftFlag,
);

type UserTemplatesProps = {
  userTemplateName: string;
  userTemplateField: any;
  userTemplates: any;
  commonTemplates: any;
  openshiftFlag: boolean;
  onChange: (key: string, value: string) => void;
};
