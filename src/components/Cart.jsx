import "../styles/cart.css";

const Cart = ({ cartItems, onRemove, onChangeQty, total }) => {
  return (
    <div className="cart-panel">
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="qty-controls">
                    <button onClick={() => onChangeQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onChangeQty(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <p>Total: ${total.toFixed(2)}</p>
            <button className="checkout-btn">Finalizar compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
