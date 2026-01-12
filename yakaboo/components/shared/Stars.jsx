"use client";

import Image from 'next/image'
import React from 'react'

export const Stars = ({ count, isSmaller=false }) => {
  return (
    <div className={`stars ${isSmaller ? 'smaller': ''}`}>
      <Image src="/icons/star.svg" alt="" width="18" height="18" />
      { count }
    </div>
  )
}
