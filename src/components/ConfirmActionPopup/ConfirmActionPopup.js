import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const ConfirmActionPopup = ({
  isOpen,
  onClose,
  onSubmit,
  submitText,
  title,
  data,
  isLoading,
}) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(data);
  };

  return (
    <PopupWithForm
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={submitText}
      onSubmit={handleSubmit}
      isSmall={true}
      name={'confirm-action'}
      isLoading={isLoading}
    />
  );
};

export default ConfirmActionPopup;
