import React from 'react'

export const ProductCardSkeleton = () => {
  return (
    <div className="product-card skeleton">
        <div className="product-card__image skeleton__image">
            <div className="product-card__body">
                <div className="skeleton__line short"></div>
                <div className="skeleton__line"></div>
                <div className="skeleton__line price"></div>
            </div>
        </div>
    </div>
  )
}