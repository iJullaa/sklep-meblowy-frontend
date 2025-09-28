import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar /> 
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
}

export default App;