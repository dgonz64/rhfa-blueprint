import React, { forwardRef } from 'react'

export * from 'react-hook-form-auto'

import { Autoform as RHFAutoform, setTranslations } from 'react-hook-form-auto'

import overrides from './skinOverride'

export let Autoform = (props, ref) =>
  <RHFAutoform
    {...props}
    skinOverride={overrides}
    ref={ref}
  />

Autoform = forwardRef(Autoform)
