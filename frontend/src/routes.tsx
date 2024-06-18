import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Layout from "./components/layout";
// import Layout from "./views/layout/layout";

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
        element: <Layout />,
        routes: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
];

export default routes;