import React, { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {useForm} from "../../hooks/useForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: 'Имя...',
    about: 'Описание...',
  })

  const setCurrentUserData = () => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    })
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const isChanged =
      currentUser.name !== values.name || currentUser.about !== values.about;

    if (isChanged) {
      onUpdateUser(values);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    setCurrentUserData();
  }, [currentUser, isOpen]);

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
          value={values.name}
          onChange={handleChange}
          className="popup__form-input popup__form-input_data_name"
          type="text"
          id="name-profile"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__form-error popup__form-error_data_profile-name" />
      </div>
      <div className="popup__form-field">
        <input
          value={values.about}
          onChange={handleChange}
          className="popup__form-input popup__form-input_data_desc"
          type="text"
          id="about-profile"
          name="about"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__form-error popup__form-error_data_profile-desc" />
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
