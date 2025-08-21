import Image from 'next/image'

export const SliderBtn = ({ onClickHandler, prevBtn=false }) => {
    return (
        <button className={`book-container__slider-btn hobby-page__slider-btn ${ prevBtn ? "prev-btn" : "next-btn" } slider-btn`}
        onClick={ onClickHandler }>
            <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
        </button>
    )
}