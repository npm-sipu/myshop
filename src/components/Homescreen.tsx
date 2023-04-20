import products from "../products";
import Product from "./Product";

const Homescreen: React.FC = () => {
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
