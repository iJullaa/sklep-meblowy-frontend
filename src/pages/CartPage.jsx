import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

function CartPage() {

  const { cartItems, cartItemCount } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="cart-page">
      <h1>Twój Koszyk</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Twój koszyk jest pusty.</p>
          <Link to="/" className="btn-primary">Wróć do sklepu</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>Cena: {item.price.toFixed(2)} zł</p>
                  <div className="item-quantity">
                    <span>Ilość: {item.quantity}</span>
                  </div>
                </div>
                <div className="item-total">
                  <p>Suma: {(item.quantity * item.price).toFixed(2)} zł</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Podsumowanie</h2>
            <p>Liczba produktów: {cartItemCount}</p>
            <h3>Łączna kwota: {totalPrice.toFixed(2)} zł</h3>
            <button className="btn-checkout" disabled>
              Przejdź do płatności
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;