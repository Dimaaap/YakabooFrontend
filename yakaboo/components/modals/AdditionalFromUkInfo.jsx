import React from 'react'

export const AdditionalFromUkInfo = ({ daysCount }) => {
  return (
    <div className="modal small-modal info-modal">
        <p className="info-modal__text">
            Доставка здійснюватиметься з Великої Британії протягом {daysCount} робочих 
            днів. Для цього вам необхідно оформити замовлення. Терміни доставки можуть змінюватись,
            про що ми вас обов'язково повідомимо
        </p>
    </div>
  )
}
