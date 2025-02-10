import { createBrowserRouter } from "react-router-dom";
import Mainpage from "../pages/Mainpage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import App from "../App";
import Account from "../pages/Account";
import AddStudent from "../pages/AddStudent";
import StudentDetails from "../pages/StudentDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Mainpage />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/addStudent",
        element: <AddStudent />,
      },
      {
        path: "/studentDetails/:id",
        element: <StudentDetails />,
      },
    ],
  },
]);

export default router;
