# rhfa-blueprint

This library allows your React application to automatically generate forms using [ReactHookForm](https://react-hook-form.com/) that are redered by [Blueprint](https://blueprintjs.com/). The form and validations are generated following a schema inspired by [SimpleSchema](https://github.com/aldeed/simple-schema-js).

## Installation

    $ npm install react-hook-form rhfa-blueprint @blueprint/core @blueprint/icons @blueprint/table --save

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
  something: {
    type: 'range',
    min: 10,
    max: 90,
    step: 5,
    labelStep: 20,
    defaultValue: 50
  }
```

### Helper text

You can specify helperText in the schema and it will be printed as Blueprint's `helperText`.

```javascript
    import { createSchema } from 'rhfa-blueprint'

    const smt = createSchema('something', {
      name: {
        type: 'string',
        helperText: tr('models.name.helper')
      }
    })
```

You can set the text directly too, without using `tr()`.

### Any other

This is just a reminder that you can set any property to wrapper or input:

```javascript
  heads: {
    type: 'number',
    addInputProps: { leftIcon: 'person' },
    addWrapperProps: { labelInfo: '(batteries included)' }
  },
```

### Exported wrappers

#### GroupAdaptor

Let's you wrap your input as `rhfa-blueprint` would. Signature is in [source code](src/components/GroupAdaptor.jsx)

#### InputGroupAdaptor

Changes usual `rhfa-blueprint` props to those of `InputGroup` from `blueprintjs`.

## [Base documentation](https://github.com/dgonz64/react-hook-form-auto)
