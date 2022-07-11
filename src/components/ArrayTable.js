import React from 'react'
import { renderLectures } from './renderLectures'

import { HTMLTable } from "@blueprintjs/core"

import { trField } from 'react-hook-form-auto'

const renderColumns = ({ items, subType, fieldNames }) => {
  return fieldNames.map((columnName, colIdx) => {
    const displayName = trField(subType, columnName)

    return (
      <th key={columnName}>
        {displayName}
      </th>
    )
  })
}

const renderRow = ({ item, subType, fieldNames }) =>
  fieldNames.map((fieldName, colIdx) =>
    <td key={colIdx}>
      {item.inputs[colIdx]}
    </td>
  )

export const ArrayTable = ({ items, schema, errorText }) => {
  const subType = schema.getType()
  const schemaDef = schema.getSchema()
  const fieldNames = Object.keys(schemaDef)

  if (items.length > 0) {
    const renderRemove = rowIdx => {
      const { idx, closeButton } = items[rowIdx]

      return (
        <td key="remove">
          {closeButton}
        </td>
      )
    }

    return (
      <>
        {renderLectures({ errorText })}
        <HTMLTable bordered>
          <thead>
            <tr>
              {renderColumns({ items, subType, fieldNames })}
              <th key="remove"></th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item, rowIdx) =>
                <tr key={item.childrenIdx}>
                  {renderRow({ item, subType, fieldNames })}
                  {renderRemove(rowIdx)}
                </tr>
              )
            }
          </tbody>
        </HTMLTable>
      </>
    )
  } else
    return renderLectures({ errorText })
}
