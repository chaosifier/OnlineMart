import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserSessionProvider } from "./context/UserSession";
import routes from "./routes";
import "@mantine/core/styles.css";

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
            <UserSessionProvider>
                <RouterProvider router={createBrowserRouter(routes)} />
            </UserSessionProvider>
        </MantineProvider>
    </React.StrictMode>
);
