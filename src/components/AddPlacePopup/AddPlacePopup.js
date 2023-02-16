import React, { useEffect, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlaceSubmit, isLoading }) => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardImageUrl, setCardImageUrl] = useState('');

  const handleTitleChange = evt => {
    setCardTitle(evt.target.value);
  };
  const handleImageUrlChange = evt => {
    setCardImageUrl(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();

    if (cardTitle && cardImageUrl) {
      onAddPlaceSubmit({
        name: cardTitle,
        link: cardImageUrl,
      });
    } else {
      onClose();
    }
  };
  const clearInputs = () =>
    setTimeout(() => {
      setCardTitle('');
      setCardImageUrl('');
    }, 240);

  useEffect(() => {
    clearInputs();
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'add-place'}
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Создать'}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="popup__form-field">
        <input
          value={cardTitle}
          onChange={handleTitleChange}
          className="popup__form-input popup__form-input_data_card-title"
          type="text"
          id="card-title"
          name="cardTitle"
          placeholder="Название места"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__form-error popup__form-error_data_card-title"></span>
      </div>
      <div className="popup__form-field">
        <input
          value={cardImageUrl}
          onChange={handleImageUrlChange}
          className="popup__form-input popup__form-input_data_card-image"
          type="url"
          id="card-image"
          name="cardImageUrl"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__form-error popup__form-error_data_card-image"></span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
