// import products from "../products";
import Product from "./Product";
import { useGetProductsQuery } from "../hooks/queries/productQueries";

interface MyError {
  message: string;
}

const Homescreen: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <button className='btn btn-wide loading'>Loading</button>
      </div>
    );

  if (error) {
    const myError = error as MyError;
    return <div>An error occurred: {myError.message}</div>;
  }

  return (
    <>
      <h1 className='text-2xl'>Latest Products</h1>
      <div className='flex flex-wrap my-2 mx-8'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Homescreen;
