import { Link } from "react-router-dom";

import Rating from "./Rating";

interface product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

const Product: React.FC<{ product?: product }> = ({ product }) => {
  return (
    <div className='h-64 w-64 m-2 p-4'>
      <Link to={`/product/${product?._id}`}>
        <img src={product?.image} alt='product' />
      </Link>
      <div>
        <Link to={`/product/${product?._id}`}>
          <h3>
            <strong>{product?.name}</strong>
          </h3>
        </Link>
        <div>
          <Rating product={product} />
        </div>
        <h3>${product?.price}</h3>
      </div>
    </div>
  );
};

export default Product;
