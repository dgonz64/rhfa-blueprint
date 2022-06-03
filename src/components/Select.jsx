import React from 'react'
import { Select as BPSelect, MultiSelect } from '@blueprintjs/select'
import { inverseSlice } from '../util/inverseSlice'
import { MenuItem, Button } from '@blueprintjs/core'
import { trModel } from 'react-hook-form-auto'

import { optioner } from '../util/optioner'

function ensureArray(thing) {
  if (Array.isArray(thing)) {
    return thing
  } else {
    if (thing)
      return [thing]
    else
      return []
  }
}

function itemSelectedIndex(item, options) {
  return options.reduce((foundAt, cur, idx) => {
    return cur == item.value ? idx : foundAt
  }, -1)
}

function escapeRegExpChars(text) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
}

// Lamed from https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/common/films.tsx
function highlightText(text, query) {
  let lastIndex = 0
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars)
  if (words.length === 0) {
    return [text]
  }
  const regexp = new RegExp(words.join("|"), "gi")
  const tokens = []
  while (true) {
    const match = regexp.exec(text)
    if (!match) {
      break
    }
    const length = match[0].length
    const before = text.slice(lastIndex, regexp.lastIndex - length)
    if (before.length > 0) {
      tokens.push(before)
    }
    lastIndex = regexp.lastIndex
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>)
  }
  const rest = text.slice(lastIndex)
  if (rest.length > 0) {
    tokens.push(rest)
  }
  return tokens
}

function filterItem(query, item, _index, exactMatch) {
  const normalizedTitle = item.label.toLowerCase()
  const normalizedQuery = query.toLowerCase()

  if (exactMatch) {
    return normalizedTitle === normalizedQuery
  } else {
    return normalizedTitle.indexOf(normalizedQuery) >= 0
  }
} 

export const Select = (props) => {
  const {
    name,
    setValue,
    onBlur,
    fieldSchema,
    schemaTypeName,
    field
  } = props

  const namedSetValue = (newValue) => {
    setValue(name, newValue)
  }

  const isMulti = fieldSchema.multiselect
  const value = isMulti ? ensureArray(props.value) : props.value

  const { label, options, selectedOption } = optioner(props, {
    addClear: !isMulti && fieldSchema.addClear
  })
  const selectedLabel = selectedOption && selectedOption.label
  const selectedIcon = selectedOption && selectedOption.icon

  const renderer = (item, { modifiers, handleClick, query }) => {
    const valueLabel = fieldSchema.showValues && item.value

    const selected = isMulti ? value.indexOf(item.value) != -1 : modifiers.active
    const icon = isMulti ? (selected ? 'tick' : 'blank') : item.icon

    if (modifiers.matchesPredicate) {
      return (
        <MenuItem
          selected={modifiers.active}
          key={item.value}
          text={highlightText(item.label, query)}
          label={valueLabel}
          icon={icon}
          onClick={handleClick}
        />
      )
    } else {
      return null
    }
  }

  let handleSelect
  if (isMulti) {
    handleSelect = item => {
      const alreadyIdx = itemSelectedIndex(item, value)

      if (alreadyIdx == -1) {
        namedSetValue([ ...value, item.value ])
      } else {
        handleRemove(null, alreadyIdx)
      }
    }
  } else {
    handleSelect = (item) => {
      namedSetValue(item.value)
    }
  }

  const handleRemove = (_, index) => {
    namedSetValue(inverseSlice(value, index))
  }

  const handleClear = () => {
    namedSetValue([])
  }

  const icon = fieldSchema.icon
  const placeholder = trModel(schemaTypeName, field, '_default')

  const clearButton = options.length > 0 ?
    <Button icon="cross" minimal onClick={handleClear} /> : undefined

  const SelectComponent = isMulti ? MultiSelect : BPSelect
  let multiselectProps = {}
  if (isMulti) {
    // For multiselect we need complete object for MultiSelect
    let byValue = isMulti && options.reduce((acc, cur) => {
      acc[cur.value] = cur

      return acc
    }, {})
    const multiValue = isMulti && value.map(cur => byValue[cur])

    multiselectProps = {
      selectedItems: multiValue,
      tagRenderer: item => item && item.label,
      tagInputProps: {
        onRemove: handleRemove,
        rightElement: clearButton,
        tagProps: { minimal: true }
      },
      resetOnSelect: true
    }
  }

  return (
    <SelectComponent
      items={options}
      itemRenderer={renderer}
      itemPredicate={filterItem}
      onItemSelect={handleSelect}
      onBlur={onBlur}
      {...multiselectProps}
    >
      {
        !isMulti &&
          <Button
            text={selectedLabel || placeholder}
            icon={selectedIcon || icon}
            rightIcon="double-caret-vertical"
          />
      }
    </SelectComponent>
  )
}
