import Image from 'next/image';

const BonusesUserStatus = () => {
    return (
        <div className="bonuses__section__user-status">
            <div className="bonuses__section__user-status_header">
                <p className="bonuses__section-text">
                    Здійснено покупок на суму: <b>0 грн</b>
                </p>
                <div className="bonuses__section-flex-text">
                    <p className="bonuses__section-text">
                    До наступного рівня: <b>1000 грн</b>
                    </p>   
                    <Image src="/icons/info.svg" alt="" width="15" height="15" className="bonuses__section-icon" />
                </div>
            </div>
            <div className="bonuses__section__user-status_body">
                <div className="bonuses__section-progress-container">
                    <div className="bonuses__section-progress">
                        <div className="bonuses__section-progress-marker active-marker"></div>
                        <p className="bonuses__section-progress-title">
                          ЧИТАЧ
                        </p>
                        <p className="bonuses__section-bonus-count">
                          0
                        </p>
                    </div>
                    <div className="bonuses__section-progress">
                        <div className="bonuses__section-progress-marker"></div>
                        <p className="bonuses__section-progress-title">
                          ЗНАВЕЦЬ
                        </p>
                        <p className="bonuses__section-bonus-count">
                          1000
                        </p>
                    </div>
                    <div className="bonuses__section-progress">
                        <div className="bonuses__section-progress-marker"></div>
                        <p className="bonuses__section-progress-title">
                          ЕРУДИТ
                        </p>
                        <p className="bonuses__section-bonus-count">
                          2000
                        </p>
                    </div>
                    <div className="bonuses__section-progress">
                        <div className="bonuses__section-progress-marker"></div>
                        <p className="bonuses__section-progress-title">
                          ГЕНІЙ
                        </p>
                        <p className="bonuses__section-bonus-count">
                          4000
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BonusesUserStatus;