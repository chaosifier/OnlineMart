import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import LoginPage from '../login/loginPage';

// Your theme configuration is merged with default theme
const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <h1>Welcome to online mart</h1>
          <LoginPage />
        </div>
      </Provider>
    </MantineProvider>
  );
}

export default App;
