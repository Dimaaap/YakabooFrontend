import React from 'react';
import { handleBackdropClick } from '../../services';
import { useDeliveryModalStore } from '../../states';
import { ModalCloseBtn } from '../shared';

export const DeliveryInfoModal = () => {
  const { setIsDeliveryModalOpen } = useDeliveryModalStore();

  return (
    <div
      className="menu delivery-modal"
      onClick={(e) => handleBackdropClick(e, setIsDeliveryModalOpen)}
    >
      <div className="delivery-modal__content">
        <ModalCloseBtn
          clickHandler={setIsDeliveryModalOpen}
          extraClasses="delivery-modal__close"
        />
        <div className="delivery-modal__text-content">
          <p className="delivery-modal__header">Оберіть місто доставки</p>
          <form action="" method="post" className="delivery-modal__info">
            <div className="delivery-modal__field-group">
              <label htmlFor="country" className="delivery-modal__label">
                Країна *
              </label>
              <input
                type="select"
                defaultValue="Україна"
                className="delivery-modal__input"
                name="country"
                id="country"
              />
            </div>
            <div className="delivery-modal__field-group">
              <label htmlFor="city" className="delivery-modal__label">
                Місто *
              </label>
              <input
                type="select"
                defaultValue="Київ"
                className="delivery-modal__input"
                name="city"
                id="city"
              />
            </div>
            <button className="delivery-modal__save-btn" type="submit">
              Зберегти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
