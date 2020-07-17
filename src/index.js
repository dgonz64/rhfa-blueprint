import React from 'react'

export * from 'react-hook-form-auto'

import { Autoform as RHFAutoform } from 'react-hook-form-auto'

import overrides from './skinOverride'

export const Autoform = (props) =>
  <RHFAutoform
    {...props}
    skinOverride={overrides}
  />
