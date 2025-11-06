import Link from "next/link"

export const BonusesInfoModal = () => {
    return(
        <div className="bonuses-info">
            <p className="bonuses-info__text">
                Бонуси будуть зараховані на бонусний рахунок у разі купівлі.
            </p>
            <Link href="/my-account/bonuses" className="bonuses-info__text-link">Детальніше</Link>
        </div>    
    )
     
}