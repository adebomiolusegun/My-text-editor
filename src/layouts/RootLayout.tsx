import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
      <Outlet />
    </div>
  );
}

export default RootLayout;
