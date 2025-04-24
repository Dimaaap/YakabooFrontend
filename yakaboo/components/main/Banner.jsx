"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'

export const Banner = () => {

    const intervalRef = useRef(null);
    const [index, setIndex] = useState(0)
    const [banners, setBanners] = useState([])

    const visibleSlides = 3
    const maxIndex = banners.length - visibleSlides
    const slideWidth = 33 + 2


    const fetchBanners = async () => {
        try {
            const cached = localStorage.getItem("banners")
            const cachedTime = localStorage.getItem("banners_time")

            const now = Date.now();
            const sixHours = 6 * 60 * 60 * 1000

            if(cached && cachedTime && now - parseInt(cachedTime) < sixHours){
                const parsedBanners = JSON.parse(cached);
                setBanners(parsedBanners);
                return 
            }

            const res = await fetch("http://127.0.0.1:8003/banners/all")
            const data = await res.json()
            setBanners(data)

            localStorage.setItem("banners", JSON.stringify(data))
            localStorage.setItem("banners_time", now.toString())
        } catch(error){
            console.error("Помилка при отриманні banners", error)
        }
    }

    const clearAutoScroll = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }

    const startAutoScroll = () => {
        clearAutoScroll();
        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % (maxIndex + 1))
        }, 7000)
    }


    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1))
        startAutoScroll()
    }

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % (maxIndex + 1))
        startAutoScroll();
    }

    useEffect(() => {
        fetchBanners()
    }, [])

    useEffect(() => {
        if(banners.length > 0){
            startAutoScroll();    
        }
        return () => clearAutoScroll();
      }, [banners])

  return (
    <div className="banner">
        <button className="banner__btn prev-btn" type="btn" onClick={handlePrev}>
            <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
        </button>
        <div className="banner__track"
        style={{
            transform: `translateX(-${index * slideWidth}%)`,
            transition: `transform 0.5s ease-in-out`
        }}>
            { banners.length > 0 ? ( banners.map((banner, i) => (
                <Link key={ i } className="banner__image" href="#">
                    <Image src={ banner.image_src } alt={`Banner_${i + 1}`} width={ 400 } height={ 400 } />
                </Link>
            ))): (
                <div className="loading">
                    {[...Array(3)].map((_, i) => (
                        <div className="loading__rect" key={i}></div>
                    ))}
                </div>
            )}
        </div>
        <button className="banner__btn next-btn" onClick={handleNext}>
            <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
        </button>
    </div>
  )
}
