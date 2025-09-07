'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { handleBackdropClick } from '../../services';
import { ModalCloseBtn } from '../shared';
import { useProductImagesStore } from '../../states';
import { useBlockBodyScroll } from '../../hooks';

const ProductImagesModal = ({ productTitle, images = [], isBook=false, bookImages = [], withCover=true}) => {
  /*
    If got the images, bookImages should be [], and on contrary, is got bookImages, images should be []
  */

  const SCROLL_BUFFER = 50;

  const { isProductImagesOpen, setIsProductImagesOpen, isReadPart, setIsReadPart } =
    useProductImagesStore();

  const [activeIndex, setActiveIndex] = useState(0)

  useBlockBodyScroll(isProductImagesOpen)

  const imagesRef = useRef([])
  const containerRef = useRef(null);
  imagesRef.current = [];

  let pageImages = useMemo(() => {
    if(images.length > 0) return null;
    return bookImages.filter((img) => img.type === "page");
  }, [images, bookImages]);


  let coverImages = useMemo(() => {
    if(images.length > 0) return null;
    return bookImages.filter((img) => img.type === "cover");
  }, [images, bookImages])

  if(isBook){
    images = [...coverImages, ...pageImages]
  }

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
      console.log(containerTop)

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
      { console.log(isReadPart, isProductImagesOpen) }
      <div className="menu__content product-images__content">
        <ModalCloseBtn
          clickHandler={ handleClose }
          extraClasses="product-images__close"
        />
        <p className="product-images__title">{productTitle}</p>
        <div className="product-images__body">
          <div className="product-images__images-container" ref={ containerRef }>
            {isBook ? (
             images.map((image, index) => (
                <div key={index} ref={ setImagesRef }>
                  <Image src={image.image_url} alt="" width="500" height="500" />
                </div>
              ))
            ) : (
              images.map((image, index) => (
                <div key={index} ref={ setImagesRef }>
                  <Image src={image} alt="" width="500" height="500" />
                </div>
              ))
            )}
            
          </div>
          <div className="product-images__small-images">
            { isBook ? (
              <>
                <p>Обкладинка</p>
                <div className="product-images__images-row">
                  {
                    images.filter(img => img.type === "cover").map((image, index) => (
                      <div 
                      key={ index }
                      className={`product-images__image-wrapper ${ activeIndex === index ? 'is-active': '' }`}
                      onClick={() => handleSmallImageClick(index)}>
                        <Image src={image.image_url} alt="" width="40" height="40" />
                      </div>
                    ))
                  }
                </div>
                <p>Уривок</p>
                <div className="product-images__images-row">
                  {
                    images.filter(img => img.type === "page").map((image, index) => (
                      <div
                      key={ index }
                      className={`product-images__image-wrapper ${ activeIndex === index + coverImages.length ? 'is-active' : ''}`}
                      onClick={() => handleSmallImageClick(index + coverImages.length)}>
                        <Image src={image.image_url} alt="" width="40" height="40" />
                      </div>
                    ))
                  }
                </div>
              </>
            ) : (
              <>
                  {withCover ? (
                    <p>Обкладинка</p>
                  ) : (
                    <p>Уривок</p>
                  )}
                  <div className="product-images__images-row">
                    { isBook ? (
                      images.map((image, index) => (
                        <div
                          key={index}
                          className={`product-images__image-wrapper ${activeIndex === index ? 'is-active': ''}`}
                          onClick={() => handleSmallImageClick(index)}
                        >
                          <Image src={image.image_url} alt="" width="40" height="40" />
                        </div>
                      ))
                    ) : (
                      images.map((image, index) => (
                        <div 
                        key={ index }
                        className={`product-images__image-wrapper ${activeIndex === index ? 'is-active': ''}`}
                        onClick={() => handleSmallImageClick(index)}>
                          <Image src={image} alt="" width="40" height="40" />
                        </div>
                      ))
                    ) }
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
