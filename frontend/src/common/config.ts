export const backendServiceBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const endpoints = {
    backendService: {
        url: backendServiceBaseUrl,
        endpoints: {
            user: {
                register: {
                    url: "/register",
                    method: "POST",
                },
                login: {
                    url: "/login",
                    method: "POST",
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
