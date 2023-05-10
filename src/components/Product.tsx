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
    <div className='card w-1/6 bg-base-100 shadow-xl box-border mx-4 my-2 h-80'>
      <figure className='px-10 pt-10'>
        <Link to={`/product/${product?._id}`}>
          <img src={product?.image} alt='product' />
        </Link>
      </figure>
      <div className='card-body items-center text-center box-border'>
        <Link to={`/product/${product?._id}`}>
          <h2>
            <strong>{product?.name}</strong>
          </h2>
        </Link>
        <Rating product={product} />

        <h3>${product?.price}</h3>
      </div>
    </div>
  );
};

export default Product;
