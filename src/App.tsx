import React from 'react';
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Login from './pages/login';
import { CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import Home from './pages/home';
import Register from './pages/register';
import { NavigationHandler, useAuth } from './hook/Auth';



function App() {
  const { isAuthed } = useAuth();
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={2}>
        <BrowserRouter>
          <NavigationHandler />
          <Routes>
            <Route path="/login" element={isAuthed ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={isAuthed ? <Home /> : <Navigate to="/login" />} />
            <Route path="/register" element={isAuthed ? <Navigate to="/" /> : <Register />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;