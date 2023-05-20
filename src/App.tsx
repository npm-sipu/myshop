import { useState, useCallback } from "react";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

//layouts
import About from "./components/About";
import Homescreen from "./components/Homescreen";
import RootLayout from "./components/RootLayout";
import Profile from "./components/Profile";
import ProductScreen from "./components/ProductScreen";
import CartScreen from "./components/CartScreen";
import LoginScreen from "./components/LoginScreen";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Homescreen />} />
        <Route path='product/:id' element={<ProductScreen />} />
        <Route path='cart/:id?' element={<CartScreen />} />
        <Route path='about' element={<About />} />
        <Route path='auth' element={<LoginScreen />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
