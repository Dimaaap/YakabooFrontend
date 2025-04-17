import Image from 'next/image'
import React from 'react'

export const BookInfoBadge = ({ text, isIcon=false }) => {
  return (
    <div className="info-badge">
        { isIcon ? (
          <button type="button">
            <Image src={ text } alt="" width="18" height="18" />  
          </button> 
        ): 
        <span>{ text }</span> }
    </div>
  )
}
