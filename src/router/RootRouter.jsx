import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import AppLayout from "../layout/AppLayout";
import Login from "../pages/auth/Login";

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
    ],
  },
]);

const RootRouter = () => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
