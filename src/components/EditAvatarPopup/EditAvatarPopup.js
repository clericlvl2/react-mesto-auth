import React, { useEffect, useRef, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const [userAvatar, setUserAvatar] = useState('');
  const inputRef = useRef();

  const handleAvatarChange = evt => {
    setUserAvatar(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();

    if (inputRef.current.value) {
      onUpdateAvatar({
        avatar: inputRef.current.value,
      });
    } else {
      onClose();
    }
  };
  const clearInput = () => setTimeout(setUserAvatar, 240, '');

  useEffect(() => {
    clearInput();
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'edit-avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      isSmall={true}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="popup__form-field">
        <input
          value={userAvatar}
          onChange={handleAvatarChange}
          ref={inputRef}
          className="popup__form-input popup__form-input_data_user-avatar"
          type="url"
          id="user-avatar"
          name="userAvatar"
          placeholder="Ссылка на аватар пользователя"
          required
        />
        <span className="popup__form-error popup__form-error_data_user-avatar"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
