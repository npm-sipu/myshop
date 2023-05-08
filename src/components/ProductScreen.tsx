import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../hooks/queries/productQueries";
import { useState, useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
import { Item } from "../hooks/useTypes";
import Rating from "./Rating";

const ProductScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const setProductQty = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value;
    setQty(value);
  }, []);

  const { data: product } = useGetProductByIdQuery(id);

  const addToCartHandler = () => {
    const { _id: productId, name: productName, price: productPrice } = product!;
    dispatch(
      addItem({ id: productId, name: productName, price: productPrice, qty })
    );
    navigate(`/cart/${id}?qty=${qty}`);
  };

  if (!product) {
    return <div>No products found</div>;
  }

  return (
    <div className='mx-4'>
      <button className='my-4 px-4 py-2 bg-slate-600 rounded-md text-white'>
        <Link to='/'>Go Back</Link>
      </button>

      <div className='flex'>
        <div>
          <img src={product?.image} alt='product' />
        </div>
        <div>
          <h3>{product?.name}</h3>
          <Rating product={product} />
          <h4>${product?.price}</h4>
          <p>{product?.description}</p>
        </div>
        <div>
          <h4>${product?.price}</h4>
          <p>
            {" "}
            status : {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
          </p>
          {product?.countInStock > 0 && (
            <div>
              <span>Quantity :</span>
              <select value={qty} onChange={setProductQty}>
                {[...Array(product?.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            disabled={!(product?.countInStock > 0)}
            className={`btn btn-wide bg-${
              product?.countInStock > 0 ? "green-500" : "gray-200"
            } ${
              !(product?.countInStock > 0) && "opacity-50 cursor-not-allowed"
            }`}
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
