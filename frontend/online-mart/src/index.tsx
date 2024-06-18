import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider, createTheme } from "@mantine/core";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Your theme configuration is merged with default theme
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
            <Provider store={store}>
                <RouterProvider router={createBrowserRouter(routes)} />
            </Provider>
        </MantineProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
