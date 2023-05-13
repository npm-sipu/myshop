import { useState, useEffect, useCallback } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectUser,
  selectIsAuthenticated,
} from "../store/slices/userSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [navigate, selectIsAuthenticated]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currVar: string) =>
      currVar === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const user = { email, password };
      dispatch(login(user));
    },
    [email, password, navigate]
  );

  const register = useCallback(async () => {}, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav>
          <img src='/images/logo.png' alt='logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === "register" && (
                <Input
                  label='Username'
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                  id='name'
                  value={name}
                  type='username'
                />
              )}

              <Input
                label='Email'
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='Password'
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                id='password'
                type='password'
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
            >
              {variant === "login" ? "Log In" : "Register"}
            </button>

            <p className='text-neutral-500 mt-12'>
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === "login" ? "Create an account" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
