import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MEBLE.PL</Link>
      </div>
      <ul className="navbar-links">
        {user ? (
          <>
            <li className="navbar-welcome">
              <span>Witaj, {user.name}!</span>
            </li>
            <li>
              <button onClick={handleLogout} className="navbar-button">
                Wyloguj
              </button>
            </li>
            <li>
              <Link to="/cart">Koszyk ({cartItemCount})</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Logowanie</Link>
            </li>
            <li>
              <Link to="/register">Rejestracja</Link>
            </li>
            <li>
              <Link to="/cart">Koszyk ({cartItemCount})</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;