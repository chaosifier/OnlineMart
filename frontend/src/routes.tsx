import HomePage from "./pages/home";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import ClientLayout from "./components/layout/client/clientLayout";
import ProductDetailPage from "./pages/product/detail/productDetailPage";
import ProductsListingPage from "./pages/product/list/productsListingPage";
import ProductAddUpdatePage from "./pages/product/addUpdate/productAddUpdatePage";
import ProductsExplorePage from "./pages/product/explore/productsExplorePage";
import { Outlet, RouteObject } from "react-router-dom";
import OrdersListingPage from "./pages/order/list/ordersListingPage";
import OrderDetailPage from "./pages/order/detail/orderDetailPage";
import CartPage from "./pages/cart/cartPage";
import CheckoutPage from "./pages/checkout/checkoutPage";

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
        path: "/login/seller",
        element: <LoginPage />,
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
            {
                path: "/seller/orders",
                element: <OrdersListingPage />,
            },
            {
                path: "/seller/orders/:id",
                element: <OrderDetailPage />,
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
    {
        path: "/cart",
        element: <CartPage />,
    },
    {
        path: "/checkout",
        element: <CheckoutPage />,
    },
];

export default routes;
