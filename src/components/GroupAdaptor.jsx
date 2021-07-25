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
  inline,
  children,
  labelOverride,
  addWrapperProps
}) => {
  if (inline) {
    return children
  } else {
    const label = typeof labelOverride != 'undefined' ?
      labelOverride : trField({ fieldSchema, schemaTypeName, field })

    const helperId = trPath(schemaTypeName, field, '_helper')
    let helperText
    if (errorText)
      helperText = errorText
    else if (stringExists(helperId))
      helperText = tr(helperId)
    else
      helperText = fieldSchema.helperText

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
