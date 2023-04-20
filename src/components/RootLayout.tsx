import { Outlet } from "react-router";
import Header from "./Header";

interface darkModeProp {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const RootLayout: React.FC<darkModeProp> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      <main
        className={`
          ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          } h-screen box-border
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
