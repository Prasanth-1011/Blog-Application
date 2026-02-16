import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./Layout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Explore from "./Pages/Dashboard/Explore";
import AddPost from "./Pages/Dashboard/AddPost";
import Profile from "./Pages/Dashboard/Profile";
import Provider from "./Context";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        index: true,
                        element: <Explore />,
                    },
                    {
                        path: "create",
                        element: <AddPost />,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
