import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__btn-like ${
    isLiked && 'card__btn-like_active'
  }`;

  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          />
          <span className="card__like-indicator">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          className="card__btn-delete"
          onClick={() => onCardDelete(card)}
        />
      )}
    </li>
  );
};

export default Card;
