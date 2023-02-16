import React from 'react';

const ImagePopup = ({ card, onClose }) => {
  const openedPopupStyle = card._id ? 'popup_opened' : '';

  return (
    <section
      className={`popup popup_type_zoom-image ${openedPopupStyle}`}
      aria-label="Фото. Увеличение"
    >
      <div className="popup__image-container">
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__image-subtitle">{card.name}</p>
        <button type="button" className="popup__btn-exit" onClick={onClose} />
      </div>
    </section>
  );
};

export default ImagePopup;
