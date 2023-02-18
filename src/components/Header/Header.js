import React from 'react';
import mestoWhite from '../../images/mesto-white.svg';
import { Link, useLocation } from 'react-router-dom';
import { DEPLOY_URL } from '../../utils/constants';

const Header = ({ isLoggedIn, onSignOut }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const userEmail = localStorage.getItem('email');

  // TODO: сделать бургер меню
  return (
    <header className="header">
      <img src={mestoWhite} alt="Лого страницы" className="header__logo" />
      {isLoggedIn ? (
        <div className="header__menu">
          <p className="header__profile">
            {userEmail ? userEmail : 'example@mail.com'}
          </p>
          <button className="header__link header__button" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      ) : (
        <Link
          to={
            currentPath === `${DEPLOY_URL}/signup`
              ? `${DEPLOY_URL}/signin`
              : `${DEPLOY_URL}/signup`
          }
          className="header__link"
        >
          {currentPath === `${DEPLOY_URL}/signup` ? 'Войти' : 'Регистрация'}
        </Link>
      )}
    </header>
  );
};

export default Header;
