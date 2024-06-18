import CustomerDashboardPage from "../views/customer/dashboard/customerDashboardPage";
import LoginPage from "../views/login/loginPage";

const routes = [
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/",
        element: <CustomerDashboardPage />
    }
];

export default routes;