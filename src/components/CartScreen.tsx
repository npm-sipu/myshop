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
    <div className='mx-10'>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <div className='grid place-content-center'>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <table className='w-full table-auto'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='px-4 py-2'>Product</th>
                <th className='px-4 py-2'>Price</th>
                <th className='px-4 py-2'>Quantity</th>
                <th className='px-4 py-2'>Subtotal</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className='px-4 py-2'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-16 h-14 mr-2'
                    />
                    {item.name}
                  </td>
                  <td className='px-4 py-2'>
                    {item.price ? `$${item.price.toFixed(2)}` : ""}
                  </td>
                  <td className='px-4 py-2'>
                    <input
                      type='number'
                      value={item.qty}
                      onChange={(event) => handleQuantityChange(item, event)}
                      className='w-20 rounded-lg border-gray-400 border p-1'
                    />
                  </td>
                  <td className='px-4 py-2'>
                    {item.price ? `$${(item.price * item.qty).toFixed(2)}` : ""}
                  </td>
                  <td className='px-4 py-2'>
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg'
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className='text-right pr-4 py-2 font-medium'>
                  Subtotal:
                </td>
                <td className='px-4 py-2 font-medium'>
                  ${subtotal.toFixed(2)}
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={3} className='text-right pr-4 py-2 font-bold'>
                  Total:
                </td>
                <td className='px-4 py-2 font-bold'>${subtotal.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <div className='flex justify-between mt-4'>
            <button
              onClick={() => dispatch(clearCart())}
              className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium px-4 py-2 rounded-lg'
            >
              Clear Cart
            </button>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg'>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
