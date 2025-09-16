import Link from "next/link"
import Image from "next/image"


export const SliderCategories = ({ giftCategories, startIndex }) => {
        const ITEM_WIDTH = 230;

        return (
            <div className="hobby-categories__container extended-container__viewport">
                <div className="extended-container__track" style={{ 
                transform: `translateX(-${startIndex * ITEM_WIDTH}px)` 
                }}>
                    { giftCategories.length > 0 && (
                        giftCategories.map((category, index) => (
                            <Link className="hobby-categories__category extended-container__item"
                            href={`/gifts/category/${category.slug}`}
                            key={ index }>
                                <div className="hobby-categories__image-container">
                                    { category?.images_src?.length > 0 && (
                                        category.images_src.map((image, i) => (
                                            <Image src={ image } key={ i } alt={ `${category.title}_${i}` } 
                                            width="80" height="80" className="hobby-categories__image" />
                                        ))
                                    ) }
                                </div>
                                <p className="hobby-categories__title">
                                    { category.title }
                                </p>
                            </Link>
                        ))
                    ) }
                </div>
            </div>
        )
}