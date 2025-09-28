import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/axios';
import { useCart } from '../contexts/CartContext'; 

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Nie znaleziono produktu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`${product.name} został dodany do koszyka!`); 
    }
  };

  if (loading) return <div>Ładowanie produktu...</div>;
  if (error) return <div>Wystąpił błąd: {error}</div>;

  return (
    <div className="product-detail-page" style={{ padding: '2rem' }}>
      <Link to="/" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        &larr; Wróć do listy produktów
      </Link>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ maxWidth: '400px', height: 'auto', borderRadius: '8px' }}
          />
          <h2>Cena: {product.price} zł</h2>
          <h3>Kategoria: {product.category?.name || 'Brak'}</h3>
          <p style={{ maxWidth: '600px' }}>{product.description}</p>
          <p>Dostępna ilość: {product.stock}</p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: product.stock > 0 ? '#2c3e50' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            {product.stock > 0 ? 'Dodaj do koszyka' : 'Produkt niedostępny'}
          </button>
        </div>
      ) : (
        <p>Produkt nie został znaleziony.</p>
      )}
    </div>
  );
}

export default ProductDetailPage;