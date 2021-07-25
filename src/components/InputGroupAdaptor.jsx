import React from 'react'
import {
  InputGroup,
} from '@blueprintjs/core'

export const InputGroupAdaptor = ({
  name,
  defaultValue,
  controlProps,
  onChange,
  onBlur,
}) => {
  return (
    <InputGroup
      {...controlProps}
      name={name}
      defaultValue={defaultValue || ''}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete="off"
    />
  )
}
