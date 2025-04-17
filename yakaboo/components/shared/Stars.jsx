import Image from 'next/image'
import React from 'react'

export const Stars = ({ count }) => {
  return (
    <div className="stars">
      <Image src="/icons/star.svg" alt="" width="18" height="18" />
      { count }
    </div>
  )
}
