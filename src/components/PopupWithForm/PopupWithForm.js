import React from 'react';
import Spinner from '../Spinner/Spinner';

const PopupWithForm = ({
  isOpen,
  isSmall,
  name,
  title,
  buttonText,
  children,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const styles = {
    openedPopup: isOpen ? 'popup_opened' : '',
    smallContainer: isSmall ? 'popup__container_size_small' : '',
    smallTitle: isSmall ? 'popup__title_size_small' : '',
  };

  return (
    <section className={`popup popup_type_${name} ${styles.openedPopup}`}>
      <div className={`popup__container ${styles.smallContainer}`}>
        <h3 className={`popup__title ${styles.smallTitle}`}>{title}</h3>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`form_type_${name}`}
        >
          {children}
          <button
            className={`popup__btn-submit popup__btn-submit_type_${name} ${
              isLoading ? 'popup__btn-submit_disabled' : ''
            }`}
            type="submit"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : buttonText}
          </button>
        </form>
        <button type="button" className="popup__btn-exit" onClick={onClose} />
      </div>
    </section>
  );
};

export default PopupWithForm;
