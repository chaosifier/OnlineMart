export const backendServiceBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const endpoints = {
    backendService: {
        url: backendServiceBaseUrl,
        endpoints: {
            user: {
                register: {
                    url: "/register",
                    method: "POST"
                },
                login: {
                    url: "/login",
                    method: "POST"
                }
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
                    method: "PATCH",
                },
                delete: {
                    url: "/products/{id}",
                    method: "DELETE",
                },
            },
        },
    },
};
