import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import { useAppSelector } from "../store/store";
import { useState, useEffect, useRef } from "react";
import { useGetProductsQuery } from "../hooks/queries/productQueries";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userInfoString = localStorage.getItem("userInfo") || "";
  const userInfo = JSON.parse(userInfoString);
  const name = userInfo.name;

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const { data: products } = useGetProductsQuery();

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return function (this: any, ...args: Parameters<T>) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const debouncedSearch = debounce(handleSearch, 0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  const handleProductSelect = (productId: string) => {
    navigate(`product/${productId}`);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full h-30 bg-gray-900 flex justify-between items-center'>
      <div className='mx-2 my-2 py-2 px-4 text-white flex'>
        <NavLink to='/'>Bhatta Mart</NavLink>
      </div>
      <div className='flex justify-center items-center'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search products...'
            value={searchTerm}
            onChange={handleInputChange}
            className='w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {filteredProducts && searchTerm && (
            <ul
              className='absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md'
              ref={dropdownRef}
            >
              {filteredProducts.map((product) => (
                <li
                  key={product._id}
                  onClick={() => handleProductSelect(product._id)}
                  className='flex items-center p-2 cursor-pointer hover:bg-gray-100'
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-8 h-8 object-cover mr-2 rounded'
                  />
                  <span>{product.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='mx-4 px-2 py-2 flex items-center'>
          <NavLink className='mx-4 px-2 py-2 text-white' to='/'>
            <h3>Home</h3>
          </NavLink>
          <NavLink
            className='mx-4 px-2 py-2 flex items-center gap-2'
            to='/auth'
          >
            <span className='text-xl text-white'>
              <CgProfile />
            </span>
            {isAuthenticated ? (
              <h3 className='text-white'>{name}</h3>
            ) : (
              <h3 className='text-white'>Log In</h3>
            )}
          </NavLink>
          <NavLink className='mx-4 px-2 py-2 flex items-center' to='/cart'>
            <span className='text-xl text-white'>
              <AiOutlineShoppingCart />
            </span>
            <p className='text-white'>Cart</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
