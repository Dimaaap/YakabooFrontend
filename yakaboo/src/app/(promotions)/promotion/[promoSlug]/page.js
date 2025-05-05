"use client";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Filters } from "../../../../../components";
import { fetchData, getTimeLeft } from "../../../../../utils";


export default function PromoDetailsPage() {
    const pathname = usePathname();

    const promoSlug = pathname.split("/")[2];

    const [currentPromo, setCurrentPromo] = useState(null);
 
    const [showDetails, setShowDetails] = useState(false);

    const handleShowDetails = () => {
        if(showDetails) {
            setShowDetails(false)
        } else {
            setShowDetails(true);
        }
    }


    useEffect(() => {
        fetchData(`http://localhost:8003/promotions/by-slug/${promoSlug}`, setCurrentPromo)
    }, [])

    const promoEndDate = getTimeLeft(currentPromo?.end_date);
    const rawPromoDesc = currentPromo?.short_description;

    return(
        <div className="promotions promotion-page">
            <h4 className="promotions__title">Акції та знижки</h4>

            { currentPromo ? ( <div className="promotion-page__header">
                <div className="promotion-page__text-container">
                    <h4 className="promotion-page__title">{ currentPromo?.title }</h4>
                    { promoEndDate && (
                        <span className="promotion-page__date">
                            {`До кінця акції ${ promoEndDate }`}
                        </span>    
                    ) }
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
                    <div className="promotion-page__promo-details">
                        <div className="promotion-page__details-container">
                            <p>
                                Комікси та манґа – то не просто книжки! То окремі всесвіти, які живуть за 
                                своїми законами! І коли ви в них потрапляєте, то дороги назад вже немає! 
                                Обирайте з нашої добірки мальописи від видавництва {" "}
                                <span className="promotion-page--bold-text">Nasha Idea</span> – та 
                                замовляйте їх {" "}
                                <span className="promotion-page--bold-text">
                                    зі знижками -20%!    
                                </span> Вперед! Світів вистачить на всіх!
                            </p>
                            <p>
                                <span className="promotion-page--bold-text">Зверніть увагу!</span> {" "}
                                Акція діє тільки на книжки з цієї сторінки ⇓⇓⇓
                            </p>
                            <p>
                                У випадку виникнення ситуації, що припускає неоднозначне тлумачення цих умов, 
                                будь-яких спірних питань та/або питань, неврегульованих цими умовами, 
                                остаточне рішення приймається організатором акції.
                            </p>
                            <p>
                                А якщо у вас виникли запитання, звертайтеся за номером 0-800-335-425. 
                                Кол-центр працює 7 днів на тиждень з 9:00 до 20:00.
                            </p>
                        </div>
                    </div>
                ) }
                </div>) : (
                    <div className="promotion-page__header skeleton">
                        <div className="promotion-page__text-container skeleton-text-container">
                            <div className="promotion-page__title skeleton-title" />
                            <div className="promotion-page__date skeleton-date" />
                        </div>
                        <div className="promotion-page__content skeleton-content">
                            <div className="promotion-page__image-content skeleton-image-content" />
                            <div className="promotion-page__text-content skeleton-text-content">
                                <div className="promotion-page__promo-desc skeleton-promo-desc" />
                                <div className="promotion-page__more-btn skeleton-more-btn" />
                            </div>
                        </div>
                    </div>
                ) }

            <div className="promotion-page__main-content promo-content">
                <div className="promo-content__left">
                    <Filters />
                </div>
            </div>
        </div>
    )
}