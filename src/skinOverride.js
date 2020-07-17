import React from 'react'
import {
  FormGroup,
  InputGroup,
  RadioGroup,

  MenuItem,
  FormControlLabel,
  FormLabel,
  Radio,
  Checkbox,
  Typography,
  Slider,
  Button,
  Icon,
  IconButton,
  Card,
  CardContent
} from '@blueprintjs/core'
import { ArrayTable } from './components/ArrayTable'
import { ArrayPanel } from './components/ArrayPanel'
import { trField, tr, processOptions } from 'react-hook-form-auto'

const GroupAdaptor = ({
  name,
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
      labelOverride : trField({ fieldSchema, schemaTypeName })
    const error = errors[name]

    return (
      <FormGroup
        intent={error ? 'default' : 'danger'}
        helperText={error}
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
    coerce: value => parseFloat(value),
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
    render: (props) => {
      const { schemaTypeName, name, field, fieldSchema, register, setValue } = props

      const options = processOptions({
        ...props,
        addDefault: true
      })

      register({ name })
      const setValueFromEvent = event => {
        setValue(name, event.target.value)
      }

      return {
        ...props,
        component: ControlAdaptor,
        adaptorComponent: TextField,
        controlProps: {
          select: true,
          style: { display: 'flex' },
          onChange: setValueFromEvent,
          children: options.map(op =>
            <MenuItem key={op.value} value={op.value}>
              {op.label}
            </MenuItem>
          )
        }
      }
    }
  },
  boolean: {
    coerce: value => Boolean(value),
    render: {
      component: (props) => {
        const { register, name, defaultValue } = props

        return (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  inputProps={{ ref: register }}
                  defaultValue={defaultValue}
                />
              }
              label={trField(props)}
            />
          </div>
        )
      }
    }
  },
  radios: {
    wrapper: (props) => <GroupAdaptor {...props} component={RaioGroup} />,
    render: {
      component: (props) => {
        const { name, register, defaultValue } = props

        const label = trField(props)
        const options = processOptions(props)
        const inputProps = {
          ref: register
        }

        return (
          <div>
            <FormLabel component="legend">
              {label}
            </FormLabel>
            <RadioGroup
              aria-label={label}
              name={name}
              defaultValue={defaultValue || 0}
            >
              {
                options.map(op =>
                  <FormControlLabel
                    name={name}
                    key={op.value}
                    value={op.value}
                    control={<Radio inputProps={inputProps} />}
                    label={op.label}
                  />
                )
              }
            </RadioGroup>
          </div>
        )
      }
    }
  },
  range: {
    coerce: value => parseFloat(value),
    render: {
      component: (props) => {
        const { name, defaultValue, fieldSchema, register, setValue } = props

        register({ name })
        const setValueFromEvent = (event, value) => {
          setValue(name, value)
        }

        const { sliderParams } = fieldSchema

        return (
          <div>
            <Typography id={name} gutterBottom>
              {trField(props)}
            </Typography>
            <Slider
              {...sliderParams}
              defaultValue={defaultValue || 0}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              min={fieldSchema.min}
              max={fieldSchema.max}
              onChange={setValueFromEvent}
            />
          </div>
        )
      }
    }
  },
  button: {
    render: ({ styles, ...rest }) => {
      if (rest.type == 'submit')
        return <Button color="primary" {...rest} />
      else
        return <Button {...rest} />
    }
  },
  arrayButton: {
    render: ({ styles, ...rest }) =>
      <IconButton size="small" {...rest} />
  },
  form: {
    render: ({ children, onSubmit }) =>
      <form onSubmit={onSubmit}>
        {children}
      </form>
  },
  panel: {
    render: ({ children, header }) =>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {header}
          </Typography>
          <Typography variant="body2" component="p">
            {children}
          </Typography>
        </CardContent>
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
