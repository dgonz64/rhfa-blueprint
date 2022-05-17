import {
  tr,
  trField,
  processOptions,
} from 'react-hook-form-auto'

export function optioner(props, { addDefault, addClear } = {}) {
  let options = processOptions({
    ...props,
    addDefault
  })

  const selectedLabel = options.reduce((found, cur) => {
    if (cur && cur.value == props.value)
      return cur.label
    else
      return found
  }, '')

  if (addClear) {
    options.push({
      label: props.fieldSchema.clearLabel || tr('clearSelection'),
      value: '',
      icon: props.fieldSchema.clearIcon || 'cross'
    })
  }

  return {
    label: trField(props),
    options,
    selectedLabel
  }
}
