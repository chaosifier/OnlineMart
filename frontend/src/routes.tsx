import HomePage from "./pages/home";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import ClientLayout from "./components/layout/client/clientLayout";
import ProductDetailPage from "./pages/product/detail/productDetailPage";
import ProductsListingPage from "./pages/product/list/productsListingPage";
import ProductAddUpdatePage from "./pages/product/addUpdate/productAddUpdatePage";
import ProductsExplorePage from "./pages/product/explore/productsExplorePage";

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
    {
        path: "/seller",
        children: [
            {
                path: "/seller/products",
                element: <ProductsListingPage />,
            },
            {
                path: "/seller/products/:id",
                element: <ProductDetailPage />,
            },
            {
                path: "/seller/products/create",
                element: <ProductAddUpdatePage />,
            },
            {
                path: "/seller/products/:id/update",
                element: <ProductAddUpdatePage />,
            },
        ],
    },
    {
        path: "/products/:id",
        element: <ProductDetailPage />,
    },
    {
        path: "/products",
        element: <ProductsExplorePage />,
    },
];

export default routes;
