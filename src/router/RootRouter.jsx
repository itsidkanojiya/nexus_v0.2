import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import AppLayout from "../layout/AppLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sing-up",
        element: <Register />,
      },
    ],
  },
]);

const RootRouter = () => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
