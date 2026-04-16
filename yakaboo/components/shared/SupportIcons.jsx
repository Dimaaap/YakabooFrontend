import Image from 'next/image'
import React from 'react'

export const SupportIcons = ({ hasCashback, hasWinterSupport, hasESupport, isForWar }) => {
  return (
   <div className="product-card__support">
    { hasCashback && (
        <div className="product-card__cashback-block">
            <Image src="/images/support_programs/cashback.svg" alt="Ця книга підтримує програму 'Національний кешбек'"
            width="30" height="30" />
        </div>
    ) }
    { hasWinterSupport && (
        <Image src="/images/support_programs/winter-esupport.svg" alt="Ця книга підтримує програму 'Зимвова підтримка'" 
        width="30" height="30"/>
    )}
    { hasESupport && (
        <Image src="/icons/e-pidtrymka.svg" alt="Ця книга підтримує програму 'ЄПідтримка'"
        width="30" height="30" />
        ) }
    { isForWar && (
        <Image src="/images/support_programs/for-war.svg" alt="" width="30" height="30" />
    ) }
    </div>
  )
}
