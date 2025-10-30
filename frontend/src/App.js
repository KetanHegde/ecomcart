import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModal";
import { CartProvider, useCart } from "./context/CartContext";
import "./App.css";

function AppContent() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [refreshProducts, setRefreshProducts] = useState(0);
  const { clearCart } = useCart();

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = async (receiptData) => {
    setShowCheckout(false);
    setReceipt(receiptData);
    // Clear the cart after successful order
    await clearCart();
    // Trigger products refresh to show updated stock
    setRefreshProducts((prev) => prev + 1);
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
  };

  return (
    <div className="app">
      <Navbar onCartClick={() => setShowCart(true)} />
      <main className="main-content">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <ProductGrid refreshTrigger={refreshProducts} />
        </div>
      </main>

      {showCart && (
        <Cart onCheckout={handleCheckout} onClose={() => setShowCart(false)} />
      )}

      {showCheckout && (
        <CheckoutForm
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {receipt && (
        <ReceiptModal receipt={receipt} onClose={handleCloseReceipt} />
      )}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
