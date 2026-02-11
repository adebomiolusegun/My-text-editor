import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

export default RootLayout;
