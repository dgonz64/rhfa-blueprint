import React, { forwardRef } from 'react'

export * from 'react-hook-form-auto'
export { GroupAdaptor } from './components/GroupAdaptor'
export { InputGroupAdaptor } from './components/InputGroupAdaptor'
export { ArrayPanel } from './components/ArrayPanel'
export { ArrayTable } from './components/ArrayTable'
export { Select } from './components/Select'

import {
  Autoform as RHFAutoform,
  setLanguageByName,
  addTranslations
} from 'react-hook-form-auto'

import overrides from './skinOverride'

setLanguageByName('en')
addTranslations({
  requiredLabel: '(required)'
})

export let Autoform = (props, ref) =>
  <RHFAutoform
    {...props}
    skin={overrides}
    ref={ref}
  />

Autoform = forwardRef(Autoform)
