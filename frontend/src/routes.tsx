import HomePage from "./pages/home";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import ClientLayout from "./components/layout/client/clientLayout";
import { Outlet, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/",
        element: (
            <>
                <ClientLayout />
                <Outlet />
            </>
        ),
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
];

export default routes;
