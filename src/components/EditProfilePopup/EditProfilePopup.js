import React, { useEffect, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const [userName, setUserName] = useState('Имя...');
  const [userInfo, setUserInfo] = useState('Описание...');

  const currentUser = React.useContext(CurrentUserContext);

  const setCurrentUserData = () => {
    setUserName(currentUser.name);
    setUserInfo(currentUser.about);
  };
  const handleNameChange = evt => {
    setUserName(evt.target.value);
  };
  const handleInfoChange = evt => {
    setUserInfo(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    const isChanged =
      currentUser.name !== userName || currentUser.about !== userInfo;

    if (isChanged) {
      onUpdateUser({
        name: userName,
        about: userInfo,
      });
    } else {
      onClose();
    }
  };
  const clearInput = () => setTimeout(setCurrentUserData, 240);

  useEffect(() => {
    setCurrentUserData();
  }, [currentUser]);

  useEffect(() => {
    clearInput();
  }, [isOpen]);

  return (
    <PopupWithForm
      name={'edit-profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="popup__form-field">
        <input
          value={userName}
          onChange={handleNameChange}
          className="popup__form-input popup__form-input_data_name"
          type="text"
          id="profile-name"
          name="userName"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__form-error popup__form-error_data_profile-name"></span>
      </div>
      <div className="popup__form-field">
        <input
          value={userInfo}
          onChange={handleInfoChange}
          className="popup__form-input popup__form-input_data_desc"
          type="text"
          id="profile-desc"
          name="userDescription"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__form-error popup__form-error_data_profile-desc"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
