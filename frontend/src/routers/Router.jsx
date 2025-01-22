import { createBrowserRouter } from "react-router-dom";
import Mainpage from "../pages/Mainpage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element:<Mainpage />
            },
            {
                path: "/signin",
                element:<SignIn />
            },
            {
                path:"/signup",
                element:<SignUp />
            }
        ]

    }
]);

export default router;