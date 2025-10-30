import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { cartAPI } from "../services/api";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    loading: false,
    error: null,
  });

  const fetchCart = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await cartAPI.getCart();
      dispatch({ type: "SET_CART", payload: response.data.data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to fetch cart",
      });
    }
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await cartAPI.addToCart(productId, quantity);
      dispatch({ type: "SET_CART", payload: response.data.data });
      return { success: true };
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to add item to cart";
      dispatch({ type: "SET_ERROR", payload: errorMsg });
      return { success: false, error: errorMsg };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await cartAPI.updateItem(itemId, quantity);
      dispatch({ type: "SET_CART", payload: response.data.data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to update item",
      });
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await cartAPI.removeItem(itemId);
      dispatch({ type: "SET_CART", payload: response.data.data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to remove item",
      });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await cartAPI.clearCart();
      dispatch({ type: "SET_CART", payload: { items: [], total: 0 } });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to clear cart",
      });
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
