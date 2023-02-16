import React from 'react';
import mestoWhite from '../../images/mesto-white.svg';

const Header = () => {
  return (
    <header className="header">
      <img src={mestoWhite} alt="Лого страницы" className="header__logo" />
    </header>
  );
};

export default Header;
