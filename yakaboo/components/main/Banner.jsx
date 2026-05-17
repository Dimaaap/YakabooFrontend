'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';


export const Banner = ({ banners=[], bigger=false, smallerHeight=false, isLoading=false }) => {
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);

  const validBanners = banners
  .map((banner) => ({
    ...banner,
    image: banner.image_src || banner.image_url,
  }))
  .filter((banner) => banner.image && banner.image !== "test");

  const gap = 16;

  const getTranslateX = () => {
    const slideWidth = `(100% - ${(visibleSlides - 1) * gap}px) / ${visibleSlides}`;

    return `calc(-${index} * (${slideWidth} + ${gap}px))`;
  }

  const maxIndex = Math.max(0, validBanners.length - visibleSlides);

  const clearAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoScroll = () => {
    clearAutoScroll();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 7000);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
    startAutoScroll();
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % (maxIndex + 1));
    startAutoScroll();
  };

  useEffect(() => {
    if (validBanners.length > 0) {
      startAutoScroll();
    }
    return () => clearAutoScroll();
  }, [banners, maxIndex]);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth <= 481){
        setVisibleSlides(1);
      } else if(window.innerWidth <= 767){
        setVisibleSlides(2);
      } else {
        setVisibleSlides(4);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setIndex((prev) =>
      Math.min(prev, Math.max(0, validBanners.length - visibleSlides))
    );
  }, [visibleSlides, validBanners.length]);

  const showSkeleton = isLoading || validBanners.length === 0;

  if(showSkeleton){
    return (
      <div className="banner loading">
        <div className="banner__viewport loading__viewport">
          <div className="banner__track loading__track">
            {[...Array(3)].map((_, i) => (
              <div className="banner__image loading__image" key={ i }></div>  
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`banner ${bigger ? "bigger" : ""}${smallerHeight ? "small-height": ""}`}>
      <button className="banner__btn prev-btn" type="btn" onClick={handlePrev}>
        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
      </button>

      <div className="banner__viewport">
        <div
          className="banner__track"
          style={{
            transform: `translateX(${getTranslateX()})`,
            transition: `transform 0.5s ease-in-out`,
          }}
        >
          {validBanners.map((banner, i) => (
              <Link key={i} className="banner__image" href={banner.link}>
                <Image
                  src={banner?.image}
                  alt={`Banner_${i + 1}`}
                  width={400}
                  height={300}
                />
              </Link>
            ))}
        </div>  
      </div>
      
      <button className="banner__btn next-btn" onClick={handleNext}>
        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
      </button>
    </div>
  );
};
