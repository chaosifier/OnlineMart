export const backendServiceBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
export const imageCdnBaseUrl = import.meta.env.VITE_IMAGE_CDN_URL;

export const endpoints = {
    backendService: {
        url: backendServiceBaseUrl,
        imageCdnUrl: imageCdnBaseUrl,
        endpoints: {
            user: {
                register: {
                    url: "/auth/register",
                    method: "POST",
                },
                login: {
                    url: "/auth/login",
                    method: "POST",
                },
                me: {
                    url: "/auth/me",
                    method: "GET",
                },
            },
            order: {
                create: {
                    url: "/orders",
                    method: "POST",
                },
                getSellerOrders: {
                    url: "/orders/seller",
                    method: "GET",
                },
                getCustomerOrders: {
                    url: "/orders",
                    method: "GET",
                },
                updateLineItemStatus: {
                    url: "/orders/line/{id}",
                    method: "PATCH",
                },
            },
            product: {
                add: {
                    url: "/products",
                    method: "POST",
                },
                getSingle: {
                    url: "/products/{id}",
                    method: "GET",
                },
                getAll: {
                    url: "/products",
                    method: "GET",
                },
                update: {
                    url: "/products/{id}",
                    method: "POST",
                },
                delete: {
                    url: "/products/{id}",
                    method: "DELETE",
                },
                viewMyProducts: {
                    url: "/products/mine",
                    method: "GET",
                },
            },
            role: {
                getSingle: {
                    url: "/roles/{id}",
                    method: "GET",
                },
                getAll: {
                    url: "/roles",
                    method: "GET",
                },
            },
            brand: {
                add: {
                    url: "/brands",
                    method: "POST",
                },
                getSingle: {
                    url: "/brands/{id}",
                    method: "GET",
                },
                getAll: {
                    url: "/brands",
                    method: "GET",
                },
            },
            cart: {
                getCartItems: {
                    url: "/cart",
                    method: "GET",
                },
                add: {
                    url: "/cart",
                    method: "POST",
                },
                remove: {
                    url: "/cart/item/{id}",
                    method: "DELETE",
                },
                clearCart: {
                    url: "/cart/items",
                    method: "DELETE",
                },
            },
            category: {
                add: {
                    url: "/categories",
                    method: "POST",
                },
                getSingle: {
                    url: "/categories/{id}",
                    method: "GET",
                },
                getAll: {
                    url: "/categories",
                    method: "GET",
                },
                update: {
                    url: "/categories/{id}",
                    method: "PATCH",
                },
                delete: {
                    url: "/categories/{id}",
                    method: "DELETE",
                },
            },
        },
    },
};
