import React, { useState } from 'react';
import * as auth from '../../utils/auth';
import Spinner from '../Spinner/Spinner';

const Login = ({ onLogin, onCallInfoTooltip }) => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    auth
      .authorize(formValue.email, formValue.password)
      .then(data => {
        if (data.token) {
          setFormValue({ email: '', password: '' });
          onLogin(data.token);
        }
      })
      .catch(err => {
        onCallInfoTooltip({ isError: true });
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          value={formValue.email}
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
          value={formValue.password}
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
