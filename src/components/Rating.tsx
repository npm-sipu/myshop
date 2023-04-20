import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

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

const Rating: React.FC<{ product?: product }> = ({ product }) => {
  const rating = product?.rating;
  if (rating === undefined) {
    return <div>No rating</div>;
  }

  return (
    <div>
      <div className='flex'>
        <span>
          {rating >= 1 ? (
            <BsStarFill />
          ) : rating >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>

        <span>
          {rating >= 2 ? (
            <BsStarFill />
          ) : rating >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>

        <span>
          {rating >= 3 ? (
            <BsStarFill />
          ) : rating >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>

        <span>
          {rating >= 4 ? (
            <BsStarFill />
          ) : rating >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>

        <span>
          {rating >= 5 ? (
            <BsStarFill />
          ) : rating >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      </div>
      <div>
        <span>{`${product?.numReviews} reviews`}</span>
      </div>
    </div>
  );
};

export default Rating;
