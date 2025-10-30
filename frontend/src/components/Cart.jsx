import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";

const Cart = ({ onCheckout, onClose }) => {
  const { items, total } = useCart();

  // Calculate delivery charges
  const DELIVERY_THRESHOLD = 1000;
  const DELIVERY_CHARGE = 100;
  const subtotal = total;
  const deliveryCharge = subtotal < DELIVERY_THRESHOLD ? DELIVERY_CHARGE : 0;
  const finalTotal = subtotal + deliveryCharge;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            items.map((item) => <CartItem key={item._id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span className="subtotal-amount">₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row delivery-row">
                <span>Delivery Charges:</span>
                {deliveryCharge === 0 ? (
                  <div className="delivery-free">
                    <span className="original-delivery">
                      ₹{DELIVERY_CHARGE.toFixed(2)}
                    </span>
                    <span className="free-delivery">FREE</span>
                  </div>
                ) : (
                  <span className="delivery-amount">
                    ₹{deliveryCharge.toFixed(2)}
                  </span>
                )}
              </div>

              {subtotal < DELIVERY_THRESHOLD && (
                <div className="free-shipping-banner">
                  <span className="banner-icon">🚚</span>
                  <span className="banner-text">
                    Add ₹{(DELIVERY_THRESHOLD - subtotal).toFixed(2)} more for
                    FREE delivery!
                  </span>
                </div>
              )}

              <div className="cart-total">
                <span>Total:</span>
                <span className="total-amount">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
