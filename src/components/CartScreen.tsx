import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeItem,
  updateItemQuantity,
  syncCartState,
} from "../store/slices/cartSlice";
import { CartItem } from "../hooks/useTypes";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";

const CartScreen: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(syncCartState());
  }, [dispatch]);

  const handleQuantityChange = (
    item: CartItem,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = Number(event.target.value);
    if (quantity > 0) {
      dispatch(updateItemQuantity({ itemId: item.id, quantity }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleRemoveItem = (item: CartItem) => {
    dispatch(removeItem(item.id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price ? `$${item.price.toFixed(2)}` : ""}</td>
                  <td>
                    <input
                      type='number'
                      value={item.qty}
                      onChange={(event) => handleQuantityChange(item, event)}
                    />
                  </td>
                  <td>
                    {item.price ? `$${(item.price * item.qty).toFixed(2)}` : ""}
                  </td>
                  <td>
                    <button onClick={() => handleRemoveItem(item)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Subtotal:</td>
                <td>${subtotal.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3}>Total:</td>
                <td>${subtotal.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
          <button>Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartScreen;
