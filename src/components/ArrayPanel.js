import React from 'react'
import { Card } from '@blueprintjs/core'

const renderItems = ({ items, Panel }) =>
  items.map(({ idx, closeButton, inputs }) =>
    <Card key={idx}>
      <h5>{closeButton}</h5>
      <div>{inputs}</div>
    </Card>
  )

export const ArrayPanel = (props) => {
  const { skin } = props
  const Panel = skin.panel.render

  return (
    <>
      {renderItems({ ...props, Panel })}
    </>
  )
}

