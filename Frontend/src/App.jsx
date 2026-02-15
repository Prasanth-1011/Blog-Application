import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./Layout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Provider from "./Context";

function App() {
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
            ],
        },
    ]);

    return (
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
