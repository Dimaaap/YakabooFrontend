export const PromoDescription = ({ currentPromo }) => {
    return (
        <div className="promotion-page__promo-details">
            <div className="promotion-page__details-container" dangerouslySetInnerHTML={{ __html: currentPromo.long_description}} />
        </div>
    )
}