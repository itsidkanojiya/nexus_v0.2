import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import AppLayout from "../layout/AppLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layout/DashboardLayout";
import { testData } from "../constants/useFullData";
import PaperPreview from "../pages/teachers_dashboard/paper_preview/PaperPreview";

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
  {
    path: "/question-paper-generator",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <p>{testData}</p>,
      },
      {
        path: "/question-paper-generator/create-paper",
        element: <PaperPreview />,
      },
      {
        path: "/question-paper-generator/view-paper",
        element: <p>{testData}</p>,
      },
      {
        path: "/question-paper-generator/create-assignment",
        element: <p>{testData}</p>,
      },
      {
        path: "/question-paper-generator/view-assignment",
        element: <p>{testData}</p>,
      },
    ],
  },
]);

const RootRouter = () => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
