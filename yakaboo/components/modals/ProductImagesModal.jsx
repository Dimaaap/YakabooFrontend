'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { handleBackdropClick } from '../../services';
import { ModalCloseBtn } from '../shared';
import { useProductImagesStore } from '../../states';
import { useBlockBodyScroll } from '../../hooks';

const ProductImagesModal = ({ productTitle, images}) => {
  const SCROLL_BUFFER = 50;

  const { isProductImagesOpen, setIsProductImagesOpen, isReadPart, setIsReadPart } =
    useProductImagesStore();

  const [activeIndex, setActiveIndex] = useState(0)

  useBlockBodyScroll(isProductImagesOpen)

  const imagesRef = useRef([])
  const containerRef = useRef(null);
  imagesRef.current = [];

  const displayImages = useMemo(() => {
    return images.map((img) => {
      if(!img.cover_type){
        return { ...img, cover_type: "cover" }
      }
      return img
    })
  }, [images])

  const coverImages = useMemo(() => {
    displayImages.filter((img) => img.cover_type === "cover")
  }, [displayImages])


  const pageImages = useMemo(() => {
    displayImages.filter((img) => img.cover_type === "page")
  }, [displayImages])

  const setImagesRef = el => {
    if(el && !imagesRef.current.includes(el)){
      imagesRef.current.push(el);
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    if(!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;

      const visibleIndex = imagesRef.current.findIndex((imgEl) => {
        if(!imgEl) return false;

        const {top} = imgEl.getBoundingClientRect();
        return top - containerTop >= -SCROLL_BUFFER;
      })

      if(visibleIndex !== -1 && visibleIndex !== activeIndex){
        setActiveIndex(visibleIndex);
      }
    }

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll)
  }, [activeIndex])


  const handleSmallImageClick = index => {
    setActiveIndex(index);

    imagesRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

  const handleClose = () => {
    setIsReadPart(false)
    setIsProductImagesOpen(false)
  }

  return (
    <div
      className="menu product-images"
      onClick={(e) => handleBackdropClick(e, setIsProductImagesOpen)}
    >
      <div className="menu__content product-images__content">
        <ModalCloseBtn
          clickHandler={ handleClose }
          extraClasses="product-images__close"
        />
        <p className="product-images__title">{productTitle}</p>
        <div className="product-images__body">
          <div className="product-images__images-container" ref={ containerRef }>
            { console.log(displayImages) }
            { displayImages.map((image, index) => (
              <div key={ index } ref={ setImagesRef }>
                <Image src={ image.image_url } alt="" width="500" height="500" />
              </div>
            )) }
          </div>
          <div className="product-images__small-images">
            { pageImages?.length > 0 ? (
              <>
                <p>Обкладинка</p>
                <div className="product-images__image-row">
                  { coverImages.map((image, index) => (
                    <div key={ index }
                    className={`product-images__image-wrapper ${activeIndex === index ? 'is-active': ''}`}
                    onClick={() => handleSmallImageClick(index)}>
                      <Image src={ image.image_url } alt="" width="40" height="40" />
                    </div>
                  )) }
                </div>

                <p>Уривок</p>
                <div className="product-images__images-row">
                  { pageImages.map((image, index) => {
                    const globalIndex = coverImages.length + index;
                    return(
                      <div key={ index }
                      className={`product-images__image-wrapper 
                      ${activeIndex === globalIndex ? 'is-active': ''}`}
                      onClick={() => handleSmallImageClick(globalIndex)}>
                        <Image src={ image.image_url } alt="" width="40" height="40" />
                      </div>
                    )
                  }) }
                </div>
              </>
            ) : (
              <>
                <p>Вміст</p>
                <div className="product-images__images-row">
                  { displayImages.map((image, index) => (
                    <div key={ index } className={`product-images__image-wrapper 
                      ${activeIndex === index ? 'is-active': ''}`}
                      onClick={() => handleSmallImageClick(index)}>
                        <Image src={ image.image_url } alt="" width="40" height="40" />
                      </div>
                  )) }
                </div>
              </>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesModal;
