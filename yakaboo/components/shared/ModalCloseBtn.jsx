import React from 'react'
import Image from 'next/image'

export const ModalCloseBtn = ({ clickHandler, extraClasses=null }) => {
  return (
    <button className={`menu__close ${ extraClasses ? extraClasses : "" }`} type="button" onClick={clickHandler}>
        <Image src="/icons/close-smaller.svg" alt="" width="20" height="20" />
    </button>
  )
}

