import React from 'react'

export const LoadingCard = () => {
  return (
    <div className="top-sales-card loading-card">
        <div className="loading-image"></div>
        
        <div className="loading-content">
            <div className="loading-text long-text"></div>
            <div className="loading-text short-text"></div>
        </div>
        
        <div className="loading-price-container">
            <div className="loading-price-container-price-block">
                <div className="loading-price-container-price"></div>
                <div className="loading-price-container-bonuses"></div>    
            </div>
            <div className="loading-price-container-cart-btn"></div>
        </div>
        
        <div className="loading-delivery-status"></div>
    </div>
  )
}
