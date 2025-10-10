import Image from "next/image"

const BonusesStatusFeatures = () => {
    return (
        <div className="bonuses__section__status-features">
            <div className="bonuses__section__status-left">
                <div className="bonuses__section__status-left-header">
                    <div className="bonuses__section-slide">
                        <div className="bonuses__section-slide-image-container">
                          <Image src="https://static.yakaboo.ua/media/loyalty/image/reader.png" width="80" height="100" alt="" />
                        </div>
                        <p className="bonuses__section-slide-title">
                          ЧИТАЧ
                        </p>
                      </div>
        
                      <div className="bonuses__section-slide">
                        <div className="bonuses__section-slide-image-container">
                          <Image src="https://static.yakaboo.ua/media/loyalty/image/expert.png" width="80" height="100" alt="" />
                        </div>
                        <p className="bonuses__section-slide-title">
                          ЗНАВЕЦЬ
                        </p>
                      </div>
        
                      <div className="bonuses__section-slide">
                        <div className="bonuses__section-slide-image-container">
                          <Image src="https://static.yakaboo.ua/media/loyalty/image/erudite.png" width="80" height="100" alt="" />
                        </div>
                        <p className="bonuses__section-slide-title">
                          ЕРУДИТ
                        </p>
                      </div>
        
                      <div className="bonuses__section-slide">
                        <div className="bonuses__section-slide-image-container">
                          <Image src="https://static.yakaboo.ua/media/loyalty/image/genius.png" width="80" height="100" alt="" />
                        </div>
                        <p className="bonuses__section-slide-title">
                          ГЕНІЙ
                        </p>
                      </div>
                    </div>
                    <div className="bonuses__section__status-left-body">
                      <p className="bonuses__section-small-text">
                        На цьому рівні вам доступні:
                      </p>
                      <ul className="bonuses__section-list">
                        <li className="bonuses__section-point">
                          Бонуси на день народження
                        </li>
                        <li className="bonuses__section-point">
                          Бонуси за відгуки та рецензії
                        </li>
                        <li className="bonuses__section-point">
                          Нарахування Х2 бонусів на обрану категорію
                        </li>
                        <li className="bonuses__section-point">
                          Персональні пропозиції від обраної категорії та видавництва
                        </li>
                        <li className="bonuses__section-point">
                          Спеціальні дні з нарахуванням Х2 бонусів
                        </li>
                      </ul>
                    </div>
                </div>
                <div className="bonuses__section-category-overlay">
                    <p className="bonuses__section-category-overlay-title">
                      Ви зможете додавати категорію та видавництво місяця, коли досягнете рівня "Знавець".
                    </p>
                    <Image src="/icons/lock.svg" alt="" width="40" height="40" className="bonuses__section-category-overlay-image" />
                </div>
                <div className="bonuses__section__status-right">
                    <div className="bonuses__section-category-section">
                      <div className="bonuses__section-category-header">
                        <h4 className="bonuses__section-category-title">
                          Обирайте категорію та видавництво на цей місяць для подвійної кількості бонусів
                        </h4>
                        <div className="bonuses__section-category-content">
                          <Image src="/icons/info.svg" alt="" width="15" height="15" />
                          <p>Зверніть увагу, ви можете обрати категорію та видавництво один раз на місяць.</p>
                        </div>
                      </div>
                      <form className="bonuses__section-category-form">
                        <div className="bonuses__section-category-form__field-block">
                          <label htmlFor="category" className="bonuses__section-category-form__label">
                            Категорія
                          </label>
                          <input type="text" name="category" id="category" className="bonuses__section-category-form__input" 
                          placeholder="Додати категорію"/>
                        </div>
                        <div className="bonuses__section-category-form__field-block">
                          <label htmlFor="publishing" className="bonuses__section-category-form__label">
                            Видавництво
                          </label>
                          <input type="text" name="pubslishing" id="publishing" 
                          className="bonuses__section-category-form__input" placeholder="Додати видавництво" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BonusesStatusFeatures