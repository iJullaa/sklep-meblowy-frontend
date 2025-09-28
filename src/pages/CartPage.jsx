import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import './CartPage.css';

function CartPage() {
  const { cartItems, cartItemCount, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    const orderData = {
      orderItems: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    try {
      await apiClient.post('/orders', orderData);

      alert('Twoje zamówienie zostało pomyślnie złożone!');
      clearCart();
      navigate('/');
    } catch (error) {
      alert('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
      console.error('Błąd przy składaniu zamówienia:', error);
    }
  };

  return (
    <div className="cart-page">
      <h1>Twój Koszyk</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Twój koszyk jest pusty.</p>
          <Link to="/" className="btn-primary">Wróć do sklepu</Link>
        </div>
      ) : (
        <>
          <button onClick={clearCart} className="btn-clear-cart">
            Wyczyść koszyk
          </button>
          <div className="cart-container">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="item-details">
                    <h2>{item.name}</h2>
                    <p>Cena: {item.price.toFixed(2)} zł</p>
                    <div className="item-quantity">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="item-total">
                    <p>Suma: {(item.quantity * item.price).toFixed(2)} zł</p>
                    <button onClick={() => removeFromCart(item.id)} className="btn-remove">
                      Usuń
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Podsumowanie</h2>
              <p>Liczba produktów: {cartItemCount}</p>
              <h3>Łączna kwota: {totalPrice.toFixed(2)} zł</h3>
              <button onClick={handleCheckout} className="btn-checkout">
                Złóż zamówienie
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;