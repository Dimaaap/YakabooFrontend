import Image from 'next/image'
import React from 'react'

export const SupportIcons = ({ hasCashback, hasWinterSupport, hasESupport }) => {
  return (
   <div className="product-card__support">
    { hasCashback && (
        <div className="product-card__cashback-block">
            <Image src="/images/support_programs/natcinoalnyi-cashback.png" alt="Ця книга підтримує програму 'Національний кешбек'"
            width="100" height="100" />
        </div>
    ) }
    { hasWinterSupport && (
        <Image src="/images/support_programs/winter-support.svg" alt="Ця книга підтримує програму 'Зимвова підтримка'" 
        width="40" height="40"/>
    )}
    { hasESupport && (
        <Image src="/icons/e-pidtrymka.svg" alt="Ця книга підтримує програму 'ЄПідтримка'"
        width="40" height="40" />
        ) }
    </div>
  )
}
