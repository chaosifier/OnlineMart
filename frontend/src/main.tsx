import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme, DEFAULT_THEME } from "@mantine/core";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";

import "@mantine/core/styles.css";

// Your theme configuration is merged with default theme
console.log({ DEFAULT_THEME });

const theme = createTheme({
    fontFamily: "Montserrat, sans-serif",
    defaultRadius: "md",
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </MantineProvider>
    </React.StrictMode>
);