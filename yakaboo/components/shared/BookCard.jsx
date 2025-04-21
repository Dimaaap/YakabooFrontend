import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { BookInfoBadge } from '.'

export const BookCard = ({ imgPath, bookId  }) => {
  return (
    <Link href="#" className="book-slider__book">
        <div className="book-slider__book-info visually-hidden">
            <BookInfoBadge text={ bookId } />
            <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
        </div>
        <Image src={ imgPath } width="200" height="250" alt="" 
        className="book-slider__book-image"/>
    </Link>
    
  )
}

