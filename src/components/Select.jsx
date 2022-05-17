import React from 'react'
import { Select as BPSelect } from '@blueprintjs/select'
import { MenuItem, Button } from '@blueprintjs/core'
import { trModel } from 'react-hook-form-auto'

import { optioner } from '../util/optioner'

export const Select = (props) => {
  const {
    name,
    value,
    onChange,
    onBlur,
    fieldSchema,
    schemaTypeName,
    field
  } = props
  const { label, options, selectedLabel } = optioner(props, {
    addClear: fieldSchema.addClear
  })
  const renderer = item => {
    const valueLabel = fieldSchema.showValues && item.value

    return (
      <MenuItem
        key={item.value}
        text={item.label}
        label={valueLabel}
        icon={item.icon}
        onClick={() => onChange(item.value)}
      />
    )
  }

  const icon = fieldSchema.icon
  const placeholder = trModel(schemaTypeName, field, '_default')

  return (
    <BPSelect
      items={options}
      itemRenderer={renderer}
      onItemSelect={onChange}
      onBlur={onBlur}
    >
      <Button
        text={selectedLabel || placeholder}
        icon={icon}
        rightIcon="double-caret-vertical"
      />
    </BPSelect>
  )
}
