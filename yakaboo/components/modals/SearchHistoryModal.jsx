import React from 'react'
import Image from "next/image"
import { useBlockBodyScroll } from '../../hooks'
import { useSearchHistoryOpenStore } from '../../states'

const SearchHistoryModal = () => {

    const { isSearchHistoryModalOpen } = useSearchHistoryOpenStore()

    useBlockBodyScroll(isSearchHistoryModalOpen)
  
    return (
    <div className="menu history-modal">
        <div className="menu__content history-modal__content">
            <div className="history-modal__row">
                <p className="history-modal__text">
                    Історія пошуку
                </p>
                <button className="history-modal__btn clear-all-btn">
                    Очистити
                </button>
            </div>
            <div className="history-modal__row search-row">
                <Image src="/icons/search.svg" alt="" width="18" height="18" />
                <div className="history-modal__text">
                    Гра престолів
                </div>
            </div>

            <div className="history-modal__row search-row">
                <Image src="/icons/search.svg" alt="" width="18" height="18" />
                <div className="history-modal__text">
                    Танок
                </div>
            </div>

            <div className="history-modal__row search-row">
                <Image src="/icons/search.svg" alt="" width="18" height="18" />
                <div className="history-modal__text">
                    ранок
                </div>
            </div>

            <div className="history-modal__row search-row">
                <Image src="/icons/search.svg" alt="" width="18" height="18" />
                <div className="history-modal__text">
                    кідрук
                </div>
            </div>

            <div className="history-modal__row search-row">
                <Image src="/icons/search.svg" alt="" width="18" height="18" />
                <div className="history-modal__text">
                    Атлант
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchHistoryModal