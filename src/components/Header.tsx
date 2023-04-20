import { RxSun } from "react-icons/rx";
import { GiNightSky } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

interface darkModeProp {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ isDarkMode, toggleDarkMode }: darkModeProp) => {
  return (
    <div className='w-full h-30 bg-gray-900 flex justify-between items-center'>
      <div className='mx-2 my-2 py-2 px-4 text-white flex'>
        <NavLink to='/'>Bhatta Mart</NavLink>
      </div>
      <div className='flex'>
        <div className='mx-4 px-2 py-2 flex items-center'>
          <NavLink className='mx-4 px-2 py-2 text-white' to='/'>
            Home
          </NavLink>
          <NavLink className='mx-4 px-2 py-2 text-white' to='/about'>
            About
          </NavLink>
          <NavLink className='mx-4 px-2 py-2 flex items-center' to='/profile'>
            <span className='text-xl text-white'>
              <CgProfile />
            </span>
            <p className='text-white'>Profile</p>
          </NavLink>
          <NavLink className='mx-4 px-2 py-2 flex items-center' to='/cart'>
            <span className='text-xl text-white'>
              <AiOutlineShoppingCart />
            </span>
            <p className='text-white'>Cart</p>
          </NavLink>
        </div>
        <div className='mr-8 py-2 flex items-center cursor-pointer text-2xl text-white'>
          <span onClick={toggleDarkMode}>
            {isDarkMode ? <GiNightSky /> : <RxSun />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
