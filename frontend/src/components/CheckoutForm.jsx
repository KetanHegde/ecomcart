import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { checkoutAPI } from "../services/api";

const CheckoutForm = ({ onClose, onSuccess }) => {
  const { items, total } = useCart();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.customerName || !formData.customerEmail) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setProcessing(true);

      const response = await checkoutAPI.processCheckout({
        ...formData,
        cartItems: items,
        deliveryCharge,
        finalTotal,
      });

      setTimeout(() => {
        setProcessing(false);
        onSuccess(response.data.data);
      }, 3500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Checkout failed";
      setError(errorMessage);
      setLoading(false);
      setProcessing(false);

      if (errorMessage.includes("stock")) {
        alert(errorMessage + "\n\nPlease update your cart and try again.");
        onClose();
      }
    }
  };

  if (processing) {
    return (
      <div className="checkout-overlay">
        <div className="payment-processing">
          <div className="loader-container">
            <div className="modern-loader">
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <div className="loader-card">
                <div className="card-chip"></div>
                <div className="card-wave"></div>
              </div>
            </div>
          </div>
          <h2 className="processing-text">Processing Payment</h2>
          <p className="processing-subtext">
            Please wait while we securely process your transaction
          </p>
          <div className="processing-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-form" onClick={(e) => e.stopPropagation()}>
        {/* Fixed Header */}
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="checkout-content scrollable scrollable-y">
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {items.map((item) => (
                <div key={item._id} className="summary-item">
                  <span>
                    {item.product?.name} × {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span>Delivery Charges:</span>
                {deliveryCharge === 0 ? (
                  <span className="free-text">FREE</span>
                ) : (
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                )}
              </div>
            </div>

            <div className="summary-total">
              <strong>Total:</strong>
              <strong>₹{finalTotal.toFixed(2)}</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customerName">Full Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">Email Address</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
