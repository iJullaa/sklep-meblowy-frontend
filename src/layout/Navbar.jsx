import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MEBLE.PL</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/login">Logowanie</Link>
        </li>
        <li>
          <Link to="/cart">Koszyk</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;