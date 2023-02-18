import React from 'react';

const InfoTooltip = ({ isOpen, isError, onClose }) => {
  const errorMessage = 'Что-то пошло не так! Попробуйте ещё раз.';
  const successMessage = 'Вы успешно зарегистрировались!';
  return (
    <div className={`popup ${isOpen ? 'popup_opened': ''}`}>
      <div
        className={`popup__container popup__container_size_small popup__tooltip-icon popup__tooltip-icon_type_${
          isError ? 'error' : 'success'
        }`}
      >
        {isError ? errorMessage : successMessage}
        <button type="button" className="popup__btn-exit" onClick={onClose} />
      </div>
    </div>
  );
};

export default InfoTooltip;
