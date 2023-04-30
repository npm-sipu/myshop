import { Link } from "react-router-dom";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className='card w-1/4 bg-base-100 shadow-xl'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <figure className='px-10 pt-10'>
        <Link to={`/product/${product?._id}`}>
          <img src={product?.image} alt='product' />
        </Link>
      </figure>
      <div className='card-body items-center text-center'>
        <Link to={`/product/${product?._id}`}>
          <h2>
            <strong>{product?.name}</strong>
          </h2>
        </Link>
        <Rating product={product} />

        <h3>${product?.price}</h3>
        <div className='card-actions'>
          {isHovered && (
            <button className='btn btn-primary mt-2 transition-all duration-300'>
              Buy Now
            </button>
          )}
          {isHovered && (
            <button className='btn btn-primary mt-2 transition-all duration-300'>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
