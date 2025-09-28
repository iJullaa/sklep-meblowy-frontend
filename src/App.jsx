import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://sklep-meblowy-api.onrender.com/api';

function App() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);   

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data); 
      } catch (err) {
        setError('Nie udało się załadować produktów.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Ładowanie produktów...</div>;
  }

  if (error) {
    return <div>Wystąpił błąd: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Nasze Produkty</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.price} zł</p>
            </div>
          ))
        ) : (
          <p>Brak produktów do wyświetlenia.</p>
        )}
      </div>
    </div>
  );
}

export default App;