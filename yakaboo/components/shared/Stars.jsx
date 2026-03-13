"use client";

import Image from 'next/image'
import React from 'react'

export const Stars = ({ reviews=[], isSmaller=false }) => {
  const avgRate = reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length;
  const count = Math.round(avgRate)
  return (
    <div className={`stars ${isSmaller ? 'smaller': ''}`}>
      <Image src="/icons/star.svg" alt="" width="18" height="18" />
      { count }
    </div>
  )
}
