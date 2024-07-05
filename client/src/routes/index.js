import { createBrowserRouter,Navigate } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import EditUser from "../pages/EditUser";
import AddUser from "../pages/AddUser";

const router = createBrowserRouter([
    {
        path: "/",
        element : <App/>,
        children:[
            {
                path: "",
                element: <Navigate to="/login" replace /> // Redirect root to login
            },
            {
                path:"register",
                element: <Register/>
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"dashboard",
                element: <Dashboard/>
            },
            {
                path:"/edit-user/:id",
                element: <EditUser/>
            },
            {
                path:"/add-user",
                element: <AddUser/>
            },
            {
                path:"home",
                element: <Home/>
            }
        ]
    }



]
)

export default router;