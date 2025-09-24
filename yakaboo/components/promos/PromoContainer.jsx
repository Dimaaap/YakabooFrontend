"use client"

import { useState } from "react"
import Image from "next/image"
import { DateTime } from "../../services"
import { PromoDescription } from "."

export const PromoContainer = ({ currentPromo }) => {
    const [showDetails, setShowDetails] = useState(false);
    
    const dateTime = new DateTime()

    const handleShowDetails = () => {
        if(showDetails) {
            setShowDetails(false)
        } else {
            setShowDetails(true);
        }
    }

    return(
        <div className="promotion-page__header">
            <div className="promotion-page__text-container">
                <h4 className="promotion-page__title">{ currentPromo?.title }</h4>
                <span className="promotion-page__time-left">До кінця акції: { dateTime.getTimeLeft(currentPromo.end_date) }</span>
            </div>
            <div className="promotion-page__content">
                <div className="promotion-page__image-content">
                    <Image src={ currentPromo?.image } alt=""
                    width="600" height="300" />
                </div>
                <div className="promotion-page__text-content">
                    <p className="promotion-page__promo-desc">
                        {currentPromo?.title}
                    </p>
                    <button type="button" className="promotion-page__more-btn"
                    onClick={handleShowDetails}>
                        { !showDetails ? "Деталі акції" : "Показати менше" }
                            <Image src="/icons/arrow-left.svg" alt="" width="12" height="12" 
                            className={`${showDetails ? "invert": ""}`}/>
                    </button>
                </div>
            </div>
            { showDetails && (
                <PromoDescription currentPromo={currentPromo} />
            ) }
        </div>
    )
}