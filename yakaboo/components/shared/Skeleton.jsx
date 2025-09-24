export const Skeleton = () => {
    return (
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
    )
}