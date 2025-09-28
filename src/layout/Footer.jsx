import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MEBLE.PL. Wszelkie prawa zastrzeżone.</p>
    </footer>
  );
}

export default Footer;