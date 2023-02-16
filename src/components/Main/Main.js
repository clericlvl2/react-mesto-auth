import React from 'react';
import Card from '../Card/Card';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Main = ({
  cardsList,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__image"
          />
          <button
            type="button"
            className="profile__btn-edit-image"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__btn-edit"
            onClick={onEditProfile}
          />
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__btn-add"
          onClick={onAddPlace}
        />
      </section>
      <section className="gallery" aria-label="Фото-галерея">
        <ul className="gallery__list">
          {cardsList.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
