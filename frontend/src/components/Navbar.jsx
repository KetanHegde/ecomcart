import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const Navbar = ({ onCartClick }) => {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">🛒 Vibe Commerce</h1>
        <button className="cart-button" onClick={onCartClick}>
          <div className="cart-icon-wrapper">
            <ShoppingCart size={28} color={'white'}/>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
