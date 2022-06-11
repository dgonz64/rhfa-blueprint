import React from 'react'

export const renderLectures = ({ errorText }) => {
  if (errorText) {
    return (
      <div className="bp4-form-group bp4-intent-danger">
        <p className="bp4-form-helper-text">{errorText}</p>
      </div>
    )
  }
}
