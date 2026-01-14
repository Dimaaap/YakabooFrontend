'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';


export const Banner = ({ banners=[], bigger=false, isLoading=false }) => {
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);

  const visibleSlides = !bigger ? 3 : 4;
  const gap = 16;

  const getTranslateX = () => {
    if(index === 0) return "0px";
    return `calc(-${index} * ( (100% - ${(visibleSlides - 1) * gap}px) / ${visibleSlides} + ${gap}px ))`;
  }

  const maxIndex = Math.max(0, banners.length - visibleSlides);

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
    if (banners.length > 0) {
      startAutoScroll();
    }
    return () => clearAutoScroll();
  }, [banners, maxIndex]);

  const showSkeleton = isLoading || banners.length === 0;

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
    <div className={`banner ${bigger ? "bigger" : ""}`}>
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
          {banners.length > 0 ? (
            banners.map((banner, i) => (
              <Link key={i} className="banner__image" href={banner.link}>
                <Image
                  src={banner.image_src}
                  alt={`Banner_${i + 1}`}
                  width={400}
                  height={400}
                />
              </Link>
            ))
          ) : (
            <div className="loading">
              {[...Array(3)].map((_, i) => (
                <div className="loading__rect" key={i}></div>
              ))}
            </div>
          )}
        </div>  
      </div>
      
      <button className="banner__btn next-btn" onClick={handleNext}>
        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
      </button>
    </div>
  );
};
