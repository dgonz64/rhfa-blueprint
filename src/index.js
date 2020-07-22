import React, { forwardRef } from 'react'

export * from 'react-hook-form-auto'

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
    skinOverride={overrides}
    ref={ref}
  />

Autoform = forwardRef(Autoform)
