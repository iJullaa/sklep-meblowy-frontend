import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import apiClient from '../api/axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 

    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      console.log('Zalogowano pomyślnie!', response.data);
      
      navigate('/');
    } catch (err) {
      setError('Nieprawidłowy email lub hasło.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Logowanie</h2>
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
        <button type="submit">Zaloguj się</button>
        <p className="form-switch">
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;