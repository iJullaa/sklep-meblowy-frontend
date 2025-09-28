import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/axios';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products');
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

  if (loading) return <div>Ładowanie produktów...</div>;
  if (error) return <div>Wystąpił błąd: {error}</div>;

  return (
    <div className="home-page">
      <h1>Nasze Produkty</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '200px' }}/>
              <h2>{product.name}</h2>
              <p>{product.category?.name || 'Brak kategorii'}</p>
              <p>{product.price} zł</p>
            </Link>
          ))
        ) : (
          <p>Brak produktów do wyświetlenia.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;