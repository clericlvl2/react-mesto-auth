import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../../utils/auth.js';

const Register = ({ onCallInfoTooltip }) => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (!formValue.email || !formValue.password) {
      return;
    }

    auth.register(formValue.email, formValue.password).then(data => {
      debugger;
      if (data.email !== undefined) {
        navigate('/signin', { replace: true });
        onCallInfoTooltip({ isError: false });
      } else {
        onCallInfoTooltip({ isError: true });
      }
    });
  };
  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="email-register" />
        <input
          id="email-register"
          name="email"
          type="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          className="auth__form-input"
        />
        <label htmlFor="password-register" />
        <input
          id="password-register"
          name="password"
          type="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          className="auth__form-input"
        />
        <button type="submit" onSubmit={handleSubmit} className="auth__button">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/signin" className="auth__link">
        <p className="auth__link">Уже зарегистрированы? Войти</p>
      </Link>
    </div>
  );
};

export default Register;
