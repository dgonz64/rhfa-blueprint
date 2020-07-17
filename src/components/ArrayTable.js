import React from 'react'
// import { renderLectures } from './renderLectures'

import { Column, Table } from '@blueprintjs/table'

import { trField } from 'react-hook-form-auto'

const renderRemove = ({ idx, closeButton }) =>
  <TableCell key={idx}>
    {closeButton}
  </TableCell>

const renderTableHeader = ({ schema }) => {
  const subType = schema.getType()
  const schemaDef = schema.getSchema()
  const fields = Object.keys(schemaDef)

  return (
    <TableRow>
      <TableCell />
      {
        fields.map(sub =>
          <TableCell key={sub}>
            {trField(subType, sub)}
          </TableCell>
        )
      }
    </TableRow>
  )
}

const renderColumns = ({ items, subType }) => {
  const someItem = items[0]

  const createCellRenderer = column => rowIdx => {
    return (
      <Cell key={column}>
        {items[rowIdx].inputs[column]}
      </Cell>
    )
  }

  return fieldNames.map((columnName) => {
    const displayName = trField(subType, columnName)

    return (
      <Column
        key={columnName}
        name={displayName}
        cellRenderer={createCellRenderer(columnName)}
      />
    )
  })
}

export const ArrayTable = ({ items, schema }) => {
  const subType = schema.getType()
  const schemaDef = schema.getSchema()
  const fieldNames = Object.keys(schemaDef)

  const renderRemove = rowIdx => {
    const { idx, closeButton } = items[rowIdx]

    return (
      <Cell key="remove">
        {renderRemove({ idx, closeButton })}
      </Cell>
    )
  }

  if (items.length > 0) {
    <>
      {/* renderLectures(props) */}
      <Table numRows={items.length}>
        {renderColumns({ items, subType })}
        <Column
          key="remove"
          cellRenderer={renderRemove}
        />
      </Table>
    </>
  } else
    return null
}
