import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import LoginPage from '../login/loginPage';
import {
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import routes from '../../helpers/routes';
import Layout from '../layout/layout';
import '@mantine/core/styles.css';

// Your theme configuration is merged with default theme
const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});

const rootRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>error component goes here</h1>,
    children: routes
  }
])

function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={rootRouter}/>
      </Provider>
    </MantineProvider>
  );
}

export default App;
