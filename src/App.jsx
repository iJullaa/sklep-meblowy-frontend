import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';       
import RegisterPage from './pages/RegisterPage.jsx'; 
import Navbar from './layout/Navbar.jsx';
import Footer from './layout/Footer.jsx';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />         
          <Route path="/register" element={<RegisterPage />} />   
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;