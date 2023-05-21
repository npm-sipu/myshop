import {
  logoutFunc,
  selectIsAuthenticated,
  logout,
  userUpdate,
} from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router";
import { useState } from "react";

const Profile: React.FC = () => {
  const [profileUpdate, setProfileUpdate] = useState<Boolean>(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userInfoString = localStorage.getItem("userInfo") || "";
  const userInfo = JSON.parse(userInfoString);

  console.log(userInfo);

  const logoutHandler = async () => {
    dispatch(logout());
    logoutFunc();
    navigate("/");
    console.log("logout clicked");
  };

  const handleProfileUpdate = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    dispatch(
      userUpdate({
        name: name || userInfo.name,
        email: email || userInfo.email,
        password,
      })
    );
    setProfileUpdate(false);
  };

  return (
    <div className='bg-gray-200 p-6 w-1/2 mx-auto rounded-md'>
      <h1 className='text-3xl font-bold mb-4'>Profile</h1>
      <div className='bg-white grid place-content-center rounded-lg shadow-md p-4 mb-6'>
        <h3 className='text-xl font-bold mb-2'>{userInfo.name}</h3>
        <p className='text-gray-600'>{userInfo.email}</p>
      </div>
      <div className='flex justify-between'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => setProfileUpdate(!profileUpdate)}
        >
          {!profileUpdate ? "Update profile" : "Cancel"}
        </button>
        {isAuthenticated && (
          <button
            onClick={logoutHandler}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Logout
          </button>
        )}
      </div>
      {profileUpdate && (
        <div className='ease-in duration-300'>
          <div className='flex flex-col mb-4'>
            <label className='text-gray-800'>Enter Your New Name</label>
            <input
              type='text'
              placeholder='Enter Your New Name'
              className='input input-bordered input-info w-full max-w-xs mt-1'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label className='text-gray-800'>Enter Your New Email</label>
            <input
              type='text'
              placeholder='Enter Your New Email'
              className='input input-bordered input-info w-full max-w-xs mt-1'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label className='text-gray-800'>Enter Your Password</label>
            <input
              type='password'
              placeholder='Enter Your Password'
              className='input input-bordered input-info w-full max-w-xs mt-1'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label className='text-gray-800'>Re-Enter Your Password</label>
            <input
              type='password'
              placeholder='Re-Enter Your Password'
              className='input input-bordered input-info w-full max-w-xs mt-1'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className='btn' onClick={handleProfileUpdate}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
