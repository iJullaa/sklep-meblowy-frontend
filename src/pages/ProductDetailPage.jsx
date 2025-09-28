import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axios';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Ładowanie produktu...</div>;
  if (error) return <div>Wystąpił błąd: {error}</div>;

  return (
    <div className="product-detail-page">
      {product ? (
        <>
          <h1>{product.name}</h1>
          <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '400px' }}/>
          <h2>Cena: {product.price} zł</h2>
          <h3>Kategoria: {product.category?.name || 'Brak'}</h3>
          <p>{product.description}</p>
          <p>Dostępna ilość: {product.stock}</p>
        </>
      ) : (
        <p>Produkt nie został znaleziony.</p>
      )}
    </div>
  );
}

export default ProductDetailPage;