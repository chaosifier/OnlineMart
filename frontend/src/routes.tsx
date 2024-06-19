import HomePage from "./pages/home";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import ClientLayout from "./components/layout/client/clientLayout";

const routes = [
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
        element: <ClientLayout />,
        routes: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
];

export default routes;
