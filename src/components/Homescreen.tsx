// import products from "../products";
import Product from "./Product";
import { useGetProductsQuery } from "../hooks/queries/productQueries";
import { Item } from "../hooks/useTypes";

interface MyError {
  message: string;
}

const Homescreen: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    const myError = error as MyError;
    return <div>An error occurred: {myError.message}</div>;
  }

  return (
    <>
      <h1 className='text-2xl'>Latest Products</h1>
      <div className='flex mx-12'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Homescreen;
