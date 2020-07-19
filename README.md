# rhfa-blueprint

This library allows your React application to automatically generate forms using [ReactHookForm](https://react-hook-form.com/) that are redered by [Blueprint](https://blueprintjs.com/). The form and validations are generated following a schema inspired by [SimpleSchema](https://github.com/aldeed/simple-schema-js).

## Installation

    $ npm install react-hook-form rhfa-blueprint @blueprint/core --save

## Usage

Just like `react-hook-form-auto` except you import `rhfa-blueprint`:

```javascript
    import { createSchema, Autoform } from 'rhfa-blueprint'

    export const client = createSchema('client', {
      name: {
        type: 'string',
        required: true,
        max: 32
      },
      age: {
        type: 'number'
      }
    })

    const MyForm = ({ onSubmit }) =>
      <Autoform
        schema={client}
        onSubmit={onSubmit}
      />
```

## Specific schema attributes for Blueprint

### type = 'range'

Appart from `min` and `max`, you should setup `step` and `labelStep`:

```javascript
  algoer: {
    type: 'range',
    min: 10,
    max: 90,
    step: 5,
    labelStep: 20,
    defaultValue: 50
  }
```

Its recommended to put the `Autoform` component in its own module. This will let you opt in for the array icons.

```javascript
    import { Autoform as RHFAutoform } from 'rhfa-blueprint'
    import { Icon } from '@blueprintjs/icons'

    const skinAdd = {
      addGlyph: {
        render: () =>
          <Icon icon="add" />
      },
      removeGlyph: {
        render: () =>
          <Icon icon="remove" />
      }
    }

    export const Autoform = (props) =>
      <RHFAutoform
        schema={client}
        onSubmit={onSubmit}
        skinOverride={skinAdd}
      />
```

## [Documentation](https://github.com/dgonz64/react-hook-form-auto)
