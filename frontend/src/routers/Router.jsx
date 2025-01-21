import { createBrowserRouter } from "react-router-dom";
import Mainpage from "../pages/Mainpage";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element:<Mainpage />
            }
        ]

    }
]);

export default router;