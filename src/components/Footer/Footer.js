import React from 'react';

const Footer = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  return (
    <footer className="footer">
      <p className="footer__label">
        ©&nbsp;{currentYear}&nbsp;Mesto&nbsp;Russia
      </p>
    </footer>
  );
};

export default Footer;
