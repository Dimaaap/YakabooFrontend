import Link from "next/link"

const BonusInfoModal = () => {
    return(
        <div className="bonus-info">
            <p className="bonus-info__text">
                Бонуси будуть зараховані на бонусний рахунок у разі купівлі. 
                Для їх використання та обміну {" "}
                <span className="bonus-info__text-link">авторизуйтесь</span> {" "}
                на сайті перед замовленням.
            </p>
            <Link href="#" className="bonus-info__text-link">Детальніше</Link> 
        </div>
    )
}

export default BonusInfoModal