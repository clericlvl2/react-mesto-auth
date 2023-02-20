import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import Spinner from '../Spinner/Spinner';

const Register = ({ onSubmit, isLoading }) => {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(values);
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
          value={values.email}
          onChange={handleChange}
          className="auth__form-input"
        />
        <label htmlFor="password-register" />
        <input
          id="password-register"
          name="password"
          type="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          className="auth__form-input"
        />
        <button
          type="submit"
          className={`auth__button ${isLoading ? 'auth__button_disabled' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Зарегистрироваться'}
        </button>
      </form>
      <Link to="/signin" className="auth__link">
        <p className="auth__link">Уже зарегистрированы? Войти</p>
      </Link>
    </div>
  );
};

export default Register;
