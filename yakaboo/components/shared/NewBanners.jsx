"use client";

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'
import Link from 'next/link'
import { STALE_TIME } from '../../site.config';
import { fetcher } from '../../services/fetch.service';
import Endpoints from '../../endpoints';
import { BaseSlider, SliderCountBar } from '.';

export const NewBanners = () => {

    const VISIBLE = 4;

    const { data: banners = [], isLoading } = useQuery({
        queryKey: ["new-banners"],
        queryFn: () => fetcher(Endpoints.NEW_BANNERS),
        gcTime: STALE_TIME,
        refetchOnWindowFocus: false
    })

    const showSkeleton = isLoading || banners.length === 0;

    if(showSkeleton) {
        return (
            <div className="top-sales-section top-sales-without-image">
                <div className="top-sales-header">
                    <h3>
                        Новинки
                    </h3>
                </div>
                <div className="top-sales-slider">
                    <div className="slider-viewport">
                        <div className="slider-track">
                            {[...Array(VISIBLE)].map((_, i) => (
                                <div className="slider-item" key={ i }>
                                    <div className="banner-skeleton"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className="top-sales-section top-sales-without-image">
        <div className="top-sales-header">
            <h3>
                Новинки
            </h3>
            <Link className="top-sales-header-show-all-link top-sales-without-image-badge" href="#">
                <span>
                    Показати все 
                    <Image src="icons/chevron-down.svg" 
                    className="top-sales-header-show-all-link-icon"
                    width="18" height="19" alt="" />
                </span>
            </Link>    
        </div>
        <div className="top-sales-slider">
           
            <BaseSlider items={ banners } visible={ VISIBLE } autoPlay={ true } >
                {({ index, setIndex, next, prev, visible, maxIndex, items }) => (
                    
                    <div>
                        {items.length > visible && (
                            <>
                                <button
                                    className={`top-sales-slider-btn prev-btn ${index === 0 ? "hidden" : ""}`}
                                    onClick={prev}>
                                    <Image src="/icons/arrow-left.svg" width="30" height="30" alt="Prev" />
                                </button>

                                <button
                                    className={`top-sales-slider-btn next-btn ${index === maxIndex ? "hidden" : ""}`}
                                    onClick={next}>
                                    <Image src="/icons/arrow-left.svg" width="30" height="30" alt="Next" />
                                </button>
                            </>
                        )}

                    <div className="slider-viewport">
                         <SliderCountBar objectList={ banners } index={ index } setIndex={ setIndex } visible={ VISIBLE } />
                         <div className="slider-track"
                            style={{
                                transform: `translateX(-${index * (100 / VISIBLE)}%)`
                        }}>
                            { items.map((banner) => (
                                <Link className="slider-item slider-image" key={ banner.id } href={ banner.link }>
                                    <Image src={ banner.image_src } width="160" height="160" alt="" />
                                </Link>
                            )) }
                        </div>
                    </div>
                </div>
                )}
            </BaseSlider>
        </div>    
    </div>
  )
}
