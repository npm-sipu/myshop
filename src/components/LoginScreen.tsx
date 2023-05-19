import { useState, useEffect, useCallback } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import { login, register } from "../store/slices/authSlice";

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [navigate, selectIsAuthenticated]);

  const loginHandler = () => {
    dispatch(login({ email, password }));
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currVar: string) =>
      currVar === "login" ? "register" : "login"
    );
  }, []);

  const registerHandler = useCallback(async () => {
    dispatch(register({ name, email, password }));
    console.log("registration clicked");
    navigate("/");
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
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
              onClick={variant === "login" ? loginHandler : registerHandler}
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
