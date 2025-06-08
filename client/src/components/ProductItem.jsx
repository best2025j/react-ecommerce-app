import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => dispatch(addToCart(product))}>
        🛒 Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
