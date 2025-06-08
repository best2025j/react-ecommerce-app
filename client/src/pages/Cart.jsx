import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cart/cartSlice";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 && <p>Cart is empty.</p>}
      {cartItems.map((item) => (
        <div key={item._id}>
          {item.name} - Qty: {item.quantity}
          <button onClick={() => dispatch(removeFromCart(item._id))}>
            ❌ Remove
          </button>
        </div>
      ))}
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
};

export default Cart;
