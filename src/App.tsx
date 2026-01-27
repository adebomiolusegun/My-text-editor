import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/Home/Home";
import RootLayout from "./layouts/RootLayout";

const Router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
