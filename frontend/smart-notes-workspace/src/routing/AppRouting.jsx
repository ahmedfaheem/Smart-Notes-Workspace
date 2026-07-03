import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/Auth/AuthLayout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import DashboardLayout from "../layouts/User/DashboardLayout";
import DashboardPage from "../pages/Dashboard";
import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import NotesList from "../pages/NotesList";
import NoteDetail from "../pages/NoteDetail";
import CreateNote from "../pages/CreateNote";
import EditNote from "../pages/EditNote";
import ProtectedAuthRoute from "./ProtectedRoutes/ProtectedAuthRoute";
import ProtectedUserRoute from "./ProtectedRoutes/ProtectedUserRoute";
const routes = createBrowserRouter([
    // Landing page
    {
        path: "/",
        element: <HomePage />,
    },
    // Auth pages
    {
        path: "/",
        element: <ProtectedAuthRoute>  <AuthLayout /> </ProtectedAuthRoute>,
        children: [
            { path: "login",    element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },
    // Dashboard + nested pages
    {
        path: "/dashboard",
        element: <ProtectedUserRoute> <DashboardLayout /> </ProtectedUserRoute>,
        children: [
            { index: true,              element: <DashboardPage /> },
            { path: "notes",            element: <NotesList /> },
            { path: "notes/create",     element: <CreateNote /> },
            { path: "notes/:id",        element: <NoteDetail /> },
            { path: "notes/:id/edit",   element: <EditNote /> },
            { path: "profile",          element: <ProfilePage /> },
        ],
    },
    // 404
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default routes;
