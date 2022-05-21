import React from 'react'
import {
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
import { Select } from './components/Select'
import { ArrayTable } from './components/ArrayTable'
import { ArrayPanel } from './components/ArrayPanel'
import { trField } from 'react-hook-form-auto'
import { Controller } from 'react-hook-form'
import { optioner } from './util/optioner'

import { GroupAdaptor } from './components/GroupAdaptor'
import { InputGroupAdaptor } from './components/InputGroupAdaptor'

export default {
  defaultWrap: GroupAdaptor,
  string: {
    render: {
      component: InputGroupAdaptor
    }
  },
  number: {
    coerce: value => value && parseFloat(value) || 0,
    render: {
      component: InputGroupAdaptor,
      controlProps: { type: 'number' }
    }
  },
  password: {
    render: {
      component: InputGroupAdaptor,
      controlProps: { type: 'password' }
    }
  },
  select: {
    controlled: true,
    component: Select
  },
  htmlSelect: {
    controlled: true,
    render: {
      component: (props) => {
        const { name, value, onChange, onBlur } = props
        const { label, options } = optioner(props, { addDefault: true })

        return (
          <HTMLSelect
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            options={options}
          />
        )
      }
    }
  },
  boolean: {
    wrapper: (props) => props.children,
    coerce: value => Boolean(value),
    controlled: true,
    render: {
      inline: true,
      component: (props) => {
        const { name, value, onChange, onBlur } = props

        const label = trField(props)

        return (
          <Checkbox
            name={name}
            checked={value}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
          />
        )
      }
    }
  },
  radios: {
    wrapper: (props) => props.children,
    controlled: true,
    render: {
      inline: true,
      component: (props) => {
        const { name, value, onChange, onBlur } = props
        const { label, options } = optioner(props)

        return (
          <RadioGroup
            label={label}
            selectedValue={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            {
              options.map(op =>
                <Radio
                  key={op.value}
                  name={name}
                  label={op.label}
                  value={op.value}
                  readOnly
                />
              )
            }
          </RadioGroup>
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
          formHook
        } = props

        const defaultValue = typeof props.defaultValue == 'undefined' ?
          min : props.defaultValue

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
  div: {
    render: props =>
      <div {...props} />
  },
  text: {
    render: ({ children }) => children
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
