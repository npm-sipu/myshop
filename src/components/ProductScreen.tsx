import { useParams, Link } from "react-router-dom";
import products from "../products";
import Rating from "./Rating";

const ProductScreen = () => {
  const { id } = useParams();

  const product = products?.find((p) => p._id === id);
  if (product === undefined) {
    return <div>No rating</div>;
  }

  return (
    <div className='flex gap-2'>
      <button>
        <Link to='/'>Go Back</Link>
      </button>
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
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductScreen;