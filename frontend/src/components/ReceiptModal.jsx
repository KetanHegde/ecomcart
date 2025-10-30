import React, { useState, useEffect } from "react";

const ReceiptModal = ({ receipt, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Hide success animation after 2.5 seconds
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!receipt) return null;

  return (
    <div className="receipt-overlay" onClick={onClose}>
      {showSuccess ? (
        <div className="success-animation-container">
          <svg
            className="success-checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="success-checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="success-checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
          <h2 className="success-text">Order Confirmed!</h2>
        </div>
      ) : (
        <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
          {/* Fixed Header */}
          <div className="receipt-header">
            <div className="receipt-icon">✓</div>
            <h2>Order Confirmed!</h2>
            <p className="receipt-subtitle">Thank you for your purchase</p>
          </div>

          {/* Scrollable Content */}
          <div className="receipt-content scrollable scrollable-y">
            <div className="receipt-info-card">
              <div className="info-row">
                <span className="info-label">Order Number</span>
                <span className="info-value">{receipt.orderNumber}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Customer</span>
                <span className="info-value">{receipt.customerName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{receipt.customerEmail}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Date</span>
                <span className="info-value">
                  {new Date(receipt.timestamp).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>

            <div className="receipt-items-card">
              <h3 className="card-title">Order Details</h3>
              <div className="receipt-items-list">
                {receipt.items.map((item, index) => (
                  <div key={index} className="receipt-item-row">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="receipt-total-card">
              <div className="total-row">
                <span className="total-label">Total Amount</span>
                <span className="total-amount-order">
                  ₹{receipt.total.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="receipt-footer">
              <button className="receipt-close-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptModal;
