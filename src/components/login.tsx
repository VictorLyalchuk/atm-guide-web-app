import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from './validation/login';
import type { LoginFormErrors } from './validation/login';
// import { login } from '../services/account-services';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isCorrectAuth, setIsCorrectAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors = validateLogin({ email, password });
  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    setIsCorrectAuth(true);
    return;
  }

  try {
    // const isLoggedIn = await login(email, password);
    const isLoggedIn = true;
    if (isLoggedIn) {
      navigate('/'); 
    } else {
      setErrors({ password: 'Невірний email або пароль' });
      setIsCorrectAuth(true);
    }
  } catch (error) {
    console.error('Login error:', error);
    setErrors({ password: 'Сталася помилка при авторизації' });
  }
};


  return (
    <div style={styles.container}>
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Емейл"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            ...styles.input,
            border: isCorrectAuth ? '1px solid red' : '1px solid',
          }}
        />
         <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
            ...styles.input,
            border: isCorrectAuth ? '1px solid red' : '1px solid',
          }}
          />
          <button onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <img
              src={showPassword ? 'hide.png' : 'show.png'}
              alt={showPassword ? 'Сховати пароль' : 'Показати пароль'}
              width={20}
              height={20}
            />
          </button>

        </div>
        {errors.email && <p style={styles.p}>{errors.email}</p>}
        {errors.password && <p style={styles.p}>{errors.password}</p>}
        <button id='log'
          type="submit"
          style={styles.button}
        >
          Увійти
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 300,
    margin: '80px auto',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 10,
    textAlign: 'center' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    outline: 'none',
  },
  passwordWrapper: {
    position: 'relative' as const,
  },
  eyeButton: {
    position: 'absolute' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    height: 20
  },
  img:{
    size: 10
  },
  button: {
    padding: 10,
    fontSize: 16,
    cursor: 'pointer',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    backgroundColor: '#007bff',
    transition: '0.3s ease',
  },
  p:{
    color: 'red',
    margin: 0,
  },
};
