import React from 'react'
import Image from 'next/image'

export const ModalCloseBtn = ({ clickHandler }) => {
  return (
    <button className="menu__close" type="button" onClick={clickHandler}>
        <Image src="/icons/close-smaller.svg" alt="" width="20" height="20" />
    </button>
  )
}

