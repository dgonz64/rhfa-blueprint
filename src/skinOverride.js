import React from 'react'
import {
  FormGroup,
  InputGroup,
  Elevation,
  RadioGroup,
  Radio,
  Checkbox,
  Slider,
  Button,
  Icon,
  Card,
  HTMLSelect
} from '@blueprintjs/core'
import { ArrayTable } from './components/ArrayTable'
import { ArrayPanel } from './components/ArrayPanel'
import { trField, tr, processOptions } from 'react-hook-form-auto'
import { Controller } from 'react-hook-form'

const GroupAdaptor = ({
  name,
  field,
  fieldSchema,
  schemaTypeName,
  errors,
  inline,
  children,
  labelOverride
}) => {
  if (inline) {
    return children
  } else {
    const label = typeof labelOverride != 'undefined' ?
      labelOverride : trField({ fieldSchema, schemaTypeName, field })
    const error = errors[name]

    return (
      <FormGroup
        intent={error ? 'danger' : 'default'}
        helperText={error && error.message}
        label={label}
        labelFor={name}
        labelInfo={fieldSchema.required && tr('required')}
      >
        {children}
      </FormGroup>
    )
  }
}

const ControlAdaptor = props => {
  const {
    name,
    defaultValue,
    controlProps,
    errors,

    field,
    fieldSchema,
    adaptorComponent,
    register
  } = props

  const error = errors[field]
  const errorText = typeof error == 'object' ?
    tr(error.message, fieldSchema) : ''
  const Comp = adaptorComponent

  return (
    <Comp
      {...controlProps}
      name={name}
      defaultValue={defaultValue || ''}
      inputRef={register}
      autocomplete="off"
    />
  )
}

export default {
  defaultWrap: GroupAdaptor,
  string: {
    render: {
      component: ControlAdaptor,
      adaptorComponent: InputGroup
    }
  },
  number: {
    coerce: value => value && parseFloat(value) || 0,
    render: {
      component: ControlAdaptor,
      adaptorComponent: InputGroup,
      controlProps: { type: 'number' }
    }
  },
  password: {
    render: {
      component: ControlAdaptor,
      adaptorComponent: InputGroup,
      controlProps: { type: 'password' }
    }
  },
  select: {
    render: {
      component: (props) => {
        const {
          schemaTypeName,
          name,
          field,
          fieldSchema,
          register,
          setValue,
          formHook,
          defaultValue
        } = props

        const label = trField(props)
        const options = processOptions({
          ...props,
          addDefault: true
        })

        const renderSelect = ({ value, onChange, onBlur }) =>
          <HTMLSelect
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            options={options}
          />

        return (
          <Controller
            key={name}
            name={name}
            control={formHook.control}
            defaultValue={defaultValue || 0}
            render={renderSelect}
          />
        )
      }
    }
  },
  boolean: {
    wrapper: (props) => props.children,
    coerce: value => Boolean(value),
    render: {
      component: (props) => {
        const {
          register,
          name,
          defaultValue,
          formHook,
          control
        } = props

        const label = trField(props)

        const renderCheckbox = ({ value, onChange, onBlur }) =>
          <Checkbox
            key={name}
            name={name}
            inputProps={{ ref: register }}
            value={value}
            onChange={(e) => { onChange(e.target.checked) }}
            onBlur={onBlur}
            label={label}
          />

        return (
          <Controller
            key={name}
            name={name}
            control={formHook.control}
            defaultValue={defaultValue}
            render={renderCheckbox}
          />
        )
      }
    }
  },
  radios: {
    wrapper: (props) => props.children,
    render: {
      component: (props) => {
        const { name, formHook, register, defaultValue } = props

        const label = trField(props)
        const options = processOptions(props)

        const renderRadio = ({ value, onChange, onBlur }) =>
          <RadioGroup
            label={label}
            selectedValue={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            {
              options.map(op =>
                <Radio
                  label={op.label}
                  value={op.value}
                />
              )
            }
          </RadioGroup>

        return (
          <Controller
            name={name}
            control={formHook.control}
            defaultValue={defaultValue || 0}
            render={renderRadio}
          />
        )
      }
    }
  },
  range: {
    coerce: value => parseFloat(value),
    render: {
      component: (props) => {
        const {
          name,
          fieldSchema: {
            min,
            max,
            step,
            labelStep,
            sliderParams
          },
          register,
          formHook
        } = props

        const defaultValue = props.defaultValue ?? min

        const renderSlider = ({ value, onChange, onBlur }) =>
          <Slider
            {...sliderParams}
            min={min}
            max={max}
            value={value}
            stepSize={step}
            labelStepSize={labelStep}
            onChange={onChange}
            onBlur={onBlur}
          />
        
        return (
          <Controller
            name={name}
            control={formHook.control}
            defaultValue={defaultValue || 0}
            render={renderSlider}
          />
        )
      }
    }
  },
  button: {
    render: ({ styles, ...rest }) => {
      if (rest.type == 'submit')
        return <Button intent="primary" {...rest} />
      else
        return <Button {...rest} />
    }
  },
  arrayButton: {
    render: ({ styles, ...rest }) =>
      <Button size="small" {...rest} />
  },
  form: {
    render: ({ children, onSubmit }) =>
      <form onSubmit={onSubmit}>
        {children}
      </form>
  },
  panel: {
    render: ({ children, header }) =>
      <Card elevation={Elevation.TWO}>
        <h3>{header}</h3>
        {children}
      </Card>
  },
  addGlyph: {
    render: () =>
      <Icon icon="add" />
  },
  removeGlyph: {
    render: () =>
      <Icon icon="remove" />
  },
  arrayTable: {
    render: ArrayTable
  },
  arrayPanel: {
    render: ArrayPanel
  }
}
