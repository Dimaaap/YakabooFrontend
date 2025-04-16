import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Banner = () => {
  return (
    <div className="banner">
        <button className="banner__btn prev-btn" type="btn">
            <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
        </button>
        <div className="banner__track">
            <Link className="banner__image" href="#">
                <Image src="/images/banner_1.png" alt="" width="400" height="400"/>
            </Link>
            <Link className="banner__image" href="#">
                <Image src="/images/banner_2.jpg" alt="" width="400" height="400"/>
            </Link>
            <Link className="banner__image" href="#">
                <Image src="/images/banner_3.jpg" alt="" width="400" height="400"/>
            </Link>
            <Link className="banner__image" href="#">
                <Image src="/images/banner_4.png" alt="" width="400" height="400"/>
            </Link>
            <Link className="banner__image" href="#">
                <Image src="/images/banner_5.jpg" alt="" width="400" height="400"/>
            </Link>
        </div>
        <button className="banner__btn next-btn">
            <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
        </button>
    </div>
  )
}
