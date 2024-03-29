import React from 'react'
import {
  trPath,
  trField,
  tr,
  stringExists
} from 'react-hook-form-auto'
import {
  FormGroup
} from '@blueprintjs/core'

export const GroupAdaptor = ({
  name,
  field,
  fieldSchema,
  schemaTypeName,
  errorText,
  helperText,
  inline,
  children,
  labelOverride,
  addWrapperProps
}) => {
  if (inline) {
    return (
      <div className={errorText && 'bp4-form-group bp4-intent-danger'}>
        <div>{children}</div>
        {
          errorText &&
            <div className="bp4-form-helper-text">{errorText}</div>
        }
      </div>
    )
  } else {
    const label = typeof labelOverride != 'undefined' ?
      labelOverride : trField({ fieldSchema, schemaTypeName, field })

    const helperId = trPath(schemaTypeName, field, '_helper')
    if (errorText)
      helperText = errorText

    return (
      <FormGroup
        intent={errorText ? 'danger' : 'default'}
        helperText={helperText}
        label={label}
        labelFor={name}
        labelInfo={fieldSchema.required && tr('requiredLabel')}
        {...addWrapperProps}
      >
        {children}
      </FormGroup>
    )
  }
}
