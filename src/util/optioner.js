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

  const selectedOption = options.reduce((found, cur) => {
    if (cur && cur.value == props.value)
      return cur
    else
      return found
  }, null)

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
    selectedOption
  }
}
