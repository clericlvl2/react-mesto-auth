import React from 'react';
import Spinner from '../Spinner/Spinner';
import { useForm } from '../../hooks/useForm';

const Login = ({ onSubmit, isLoading }) => {
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
      <h1 className="auth__title">Вход</h1>
      <form onSubmit={handleSubmit} className="auth__form">
        <label htmlFor="email-login" />
        <input
          required
          id="email-login"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="auth__form-input"
        />
        <label htmlFor="password-login" />
        <input
          required
          id="password-login"
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
          {isLoading ? <Spinner /> : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Login;
