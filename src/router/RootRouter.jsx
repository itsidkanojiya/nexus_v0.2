import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import AppLayout from "../layout/AppLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layout/DashboardLayout";
import { testData } from "../constants/useFullData";
import PrivateRoute from "./PrivateRoute";
import CreatePaper from "../pages/teachers_dashboard/paper/create_paper/CreatePaper";
import ViewPaper from "../pages/teachers_dashboard/paper/view_paper/ViewPaper";

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
        element: <PrivateRoute component={DashboardLayout} />,
        children: [
            {
                index: true,
                element: <CreatePaper />,
            },
            {
                path: "/question-paper-generator/create-paper",
                element: <CreatePaper />,
            },
            {
                path: "/question-paper-generator/view-paper",
                element: <ViewPaper />,
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
    {
        path: "/unauthorized",
        element: (
            <PrivateRoute component={DashboardLayout} user_type="student" />
        ),
    },
]);

const RootRouter = () => {
    return <RouterProvider router={router} />;
};

export default RootRouter;
