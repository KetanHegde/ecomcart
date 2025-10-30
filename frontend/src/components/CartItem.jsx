import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    const maxStock = item.product?.stock || 0;
    // Don't allow quantity to exceed stock
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      updateCartItem(item._id, newQuantity);
    }
  };

  const handleDecrement = () => {
    if (item.quantity === 1) {
      // Remove from cart if quantity is 1
      removeFromCart(item._id);
    } else {
      handleQuantityChange(item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    const maxStock = item.product?.stock || 0;
    if (item.quantity < maxStock) {
      handleQuantityChange(item.quantity + 1);
    }
  };

  const maxStock = item.product?.stock || 0;
  const canAddMore = item.quantity < maxStock;

  return (
    <div className="cart-item">
      <img
        src={item.product?.image}
        alt={item.product?.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.product?.name}</h4>
        <p className="cart-item-price">₹{item.price?.toFixed(2)} each</p>
        <div className="cart-item-quantity-row">
          <div className="quantity-controls">
            <button onClick={handleDecrement} className="quantity-btn">
              -
            </button>
            <span className="quantity">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="quantity-btn"
              disabled={!canAddMore}
              title={!canAddMore ? "Maximum stock reached" : ""}
            >
              +
            </button>
          </div>
          <div className="cart-item-total">
            ₹{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
        {!canAddMore && (
          <p className="stock-limit-text">Max stock: {maxStock}</p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
