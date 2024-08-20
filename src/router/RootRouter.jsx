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
import CreateAssignment from "../pages/teachers_dashboard/assignment/create_assignment/CreateAssignment";
import ViewAssignment from "../pages/teachers_dashboard/assignment/view_assignment/ViewAssignment";
import NcertBooks from "../pages/ncert/ncert_books/NcertBooks";
import NcertBooksSolution from "../pages/ncert/ncert_books_solution/NcertBooksSolution";
import StateBoardBooks from "../pages/state_board/state_board_books/StateBoardBooks";
import StateBoardBooksSolution from "../pages/state_board/state_board_books_solution/StateBoardBooksSolution";
import AboutUs from "../pages/home/AboutUs";

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
                path: "/aboutus",
                element: <AboutUs />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/sing-up",
                element: <Register />,
            },
            {
                path: "/ncert-books",
                element: <NcertBooks />,
            },
            {
                path: "/ncert-books-solution",
                element: <NcertBooksSolution />,
            },
            {
                path: "/state-board-books",
                element: <StateBoardBooks />,
            },
            {
                path: "/state-board-books-solution",
                element: <StateBoardBooksSolution />,
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
                element: <CreateAssignment />,
            },
            {
                path: "/question-paper-generator/view-assignment",
                element: <ViewAssignment />,
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
