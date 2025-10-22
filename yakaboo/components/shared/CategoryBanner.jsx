    "use client"

    import Image from "next/image";
    import Link from "next/link";
    import { useEffect, useRef, useState } from "react";

    export const CategoryBanner = ({ banners }) => {

        const [canScrollLeft, setCanScrollLeft] = useState(false);
        const [canScrollRight, setCanScrollRight] = useState(false);
        const [activeIndex, setActiveIndex] = useState(0);

        const bannersRef = useRef(null);
        const bannerWidthRef = useRef(0);

        const DEFAULT_BANNER_WIDTH = 450;
        const BANNER_QUERY_SELECTOR = ".book-category__banners-item"
        const BANNERS_PADDING = 15;

        const checkBannersScroll = () => {
            const el = bannersRef.current;

            if(!el) return;

            const { scrollLeft, scrollWidth, clientWidth } = el;
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);

            const index = Math.round(scrollLeft / bannerWidthRef.current);
            setActiveIndex(index);
        }

        const scrollToBanner = index => {
            const el = bannersRef.current;

            if(!el) return;
            el.scrollTo({ left: index * bannerWidthRef.current, behavior: "smooth" })
            setActiveIndex(index)
        }

        const handleNextBanners = () => scrollToBanner(Math.min(activeIndex + 1, banners.length - 1));
        const handlePrevBanners = () => scrollToBanner(Math.max(activeIndex - 1, 0));

        useEffect(() => {
            const el = bannersRef.current;

            if(!el) return;

            const firstBanner = el.querySelector(BANNER_QUERY_SELECTOR);
            if(firstBanner) {
                bannerWidthRef.current = firstBanner.offsetWidth + BANNERS_PADDING;
            }

            checkBannersScroll()
            el.addEventListener("scroll", checkBannersScroll);
            window.addEventListener("resize", checkBannersScroll);

            return () => {
                el.removeEventListener("scroll", checkBannersScroll);
                window.removeEventListener("resize", checkBannersScroll)
            }
        }, [banners])

        useEffect(() => {
            const interval = setInterval(() => {
                const el = bannersRef.current;

                if(!el) return;

                if(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1){
                    el.scrollTo({ left: 0, behavior: "smooth" })
                } else {
                    el.scrollBy({ left: bannerWidthRef.current || DEFAULT_BANNER_WIDTH, behavior: "smooth" })
                }
            }, 5000);   

            return () => clearInterval(interval);
        }, [banners])

        return(
            <div className="book-category__banners-section banners">
                { canScrollLeft && (
                    <button className="books-container__btn container-slider-btn prev-btn banners-btn"
                    onClick={ handlePrevBanners }>
                        <Image src="/icons/arrow-left.svg" alt="" width="30" height="30" />
                    </button>  
                ) }
                <div className="book-category__banners-indicators">
                    { banners.slice(1, banners.length - 1).map((_, index) => (
                        <span key={ index } className={`book-category__banners-indicator ${activeIndex === index ? "active": ""}`}
                        onClick={() => scrollToBanner(index)}></span>
                    )) }
                </div>
                <div className="book-category__banners-wrapper" ref={ bannersRef }>
                    { banners.map((banner, index) => (
                        <Link href={ banner.link } key={ index } className="book-category__banners-item">
                            <Image src={ banner.image_url } width="150" height="150" alt="" />
                        </Link>
                    )) }    
                </div>

                { canScrollRight && (
                    <button className="books-container__btn container-slider-btn next-btn banners-btn "
                        onClick={ handleNextBanners }>
                            <Image src="/icons/arrow-left.svg" alt="" width="30" height="30" />
                    </button>  
                ) }
                                
            </div>
        )
    }

