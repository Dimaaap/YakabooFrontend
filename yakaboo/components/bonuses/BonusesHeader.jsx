import Image from "next/image"
import { CookiesWorker } from "../../services"

const BonusesHeader = () => {

    const userDiscount = Math.round(CookiesWorker.get("bonuses") / 10) || 0
    
    return(
        <div className="bonuses__section__info-header">
            <h1 className="bonuses__section__user-name">
                Вітаємо, { CookiesWorker.get("first_name") }!
            </h1>
            <div className="bonuses__section__bonuses-container">
                <div className="bonuses__section__bonuses-count">
                    <div className="bonuses__section-section-row">
                        <Image src="/icons/bonus.svg" alt="" width="22" height="22" className="bonuses__section-image" />
                        <h3 className="bonuses__section-title">{ CookiesWorker.get("bonuses") || 0 }</h3>
                    </div>
                    <div className="bonuses__section-section-row">
                        <p>Баланс бонусів</p>
                    </div>
                </div>
                <div className="bonuses__section__bonuses-label">
                    <div className="bonuses__section__count-bonuses">
                        <Image src="/icons/bonus.svg" alt="" width="20" height="20" />  
                        <h4 className="bonuses__section-count">
                          { CookiesWorker.get("bonuses") || 0 }
                        </h4>
                    </div>
                    <h6 className="bonuses__section-count-text">
                        {` = ${userDiscount} грн`}
                    </h6>
                </div>
            </div>
        </div>
    )
}

export default BonusesHeader