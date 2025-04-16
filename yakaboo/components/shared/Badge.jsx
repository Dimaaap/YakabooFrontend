import React from 'react'

export const Badge = ({ text, backgroundColor }) => {
  return (
    <div className="badge" style={{"background": backgroundColor}}>
      { text }
    </div>
  )
}