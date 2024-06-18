export const backendServiceBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const endpoints = {
    backendService: {
        url: backendServiceBaseUrl,
        endpoints: {
            product: {
                getAll: {
                    url: "/products",
                    method: "GET",
                },
                addPost: {
                    url: "/products",
                    method: "POST",
                },
                getSingle: {
                    url: "/products/{id}",
                    method: "GET",
                },
                deletePost: {
                    url: "/products/{id}",
                    method: "DELETE",
                },
                updatePost: {
                    url: "/products/{id}",
                    method: "PATCH",
                },
            },
        },
    },
};
