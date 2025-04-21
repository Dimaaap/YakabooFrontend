import React from 'react'

export const AuthorFacts = ({ factText }) => {
  return (
    <div className="fact">
      <p className="fact__header">Чи знаєте ви що...</p>
      <p className="fact__desc">
        { factText }
      </p>
    </div>
  )
}
