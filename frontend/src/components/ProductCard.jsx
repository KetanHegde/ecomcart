import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { items, addToCart, updateCartItem, removeFromCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const item = items.find((item) => item.product?._id === product._id);
    setCartItem(item);
  }, [items, product._id]);

  const handleAddToCart = async () => {
    if (product.stock === 0) return;

    setAdding(true);
    const result = await addToCart(product._id, 1);
    if (!result.success) {
      alert(result.error);
    }
    setAdding(false);
  };

  const handleIncrement = async () => {
    if (cartItem) {
      const currentQuantity = cartItem.quantity;
      if (currentQuantity < product.stock) {
        await updateCartItem(cartItem._id, currentQuantity + 1);
      } else {
        alert(`Maximum stock available: ${product.stock}`);
      }
    }
  };

  const handleDecrement = async () => {
    if (cartItem) {
      if (cartItem.quantity === 1) {
        await removeFromCart(cartItem._id);
      } else {
        await updateCartItem(cartItem._id, cartItem.quantity - 1);
      }
    }
  };

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;
  const stockLeft = product.stock;
  const canAddMore = cartItem
    ? cartItem.quantity < product.stock
    : product.stock > 0;

  // Calculate discount
  const hasDiscount =
    product.discount &&
    product.discount.type !== "none" &&
    product.discount.value > 0;
  const originalPrice = product.price;
  const finalPrice = product.discountedPrice || product.price;

  return (
    <div className={`product-card ${isOutOfStock ? "out-of-stock" : ""}`}>
      {(isLowStock || isOutOfStock) && (
        <div className="low-stock-badge">
          <span className="badge-text">
            {isLowStock ? `Only ${stockLeft} left!` : "Out of Stock"}
          </span>
        </div>
      )}

      <img
        src={product.image}
        alt={product.name}
        className={`product-image ${isOutOfStock ? "grayscale" : ""}`}
      />

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        {isLowStock && !isOutOfStock && (
          <div className="stock-warning">
            <span className="warning-text">Hurry! Only few left</span>
          </div>
        )}

        <div className="product-buy-container">
          <div className="product-price-container">
            {hasDiscount && !isOutOfStock && (
              <div className="discount-badge">
                {product.discount.type === "percentage" ? (
                  <span>{product.discount.value}% OFF</span>
                ) : (
                  <span>₹{product.discount.value} OFF</span>
                )}
              </div>
            )}
            <div className="price-container">
              {hasDiscount ? (
                <>
                  <span className="original-price">
                    ₹{originalPrice.toFixed(2)}
                  </span>
                  <span className="discounted-price">
                    ₹{finalPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="product-price">
                  ₹{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="product-add-container">
            {isOutOfStock ? (
              <button className="out-of-stock-btn" disabled>
                Out of Stock
              </button>
            ) : !cartItem ? (
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            ) : (
              <div className="product-quantity-controls">
                <button
                  className="quantity-btn-product"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <span className="quantity-product">{cartItem.quantity}</span>
                <button
                  className="quantity-btn-product"
                  onClick={handleIncrement}
                  disabled={!canAddMore}
                  title={!canAddMore ? "Maximum stock reached" : ""}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
