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
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import ProductScreen from "./components/ProductScreen";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = useCallback(
    () => setIsDarkMode(!isDarkMode),
    [isDarkMode]
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={
          <RootLayout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        }
      >
        <Route index element={<Homescreen />} />
        <Route path='product/:id' element={<ProductScreen />} />
        <Route path='about' element={<About />} />
        <Route path='cart' element={<Cart />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    )
  );

  // {isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}

  return <RouterProvider router={router} />;
}

export default App;