import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/Home/Home";

const Router = createBrowserRouter([{ path: "/", element: <Home /> }]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
