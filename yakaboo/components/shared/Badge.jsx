import React from 'react'

export const Badge = ({ text, backgroundColor }) => {
  return (
    <div className="badge" style={{"color": backgroundColor, "border": `1px solid ${backgroundColor}`}}>
      { text }
    </div>
  )
}