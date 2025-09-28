import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axios';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await apiClient.post('/auth/register', {
        name,
        email,
        password,
      });
      
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Wystąpił błąd podczas rejestracji.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Rejestracja</h2>
        <div className="form-group">
          <label htmlFor="name">Imię</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Hasło</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Zarejestruj się</button>
        <p className="form-switch">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;