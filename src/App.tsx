import React, { useEffect } from 'react';
import { Routes, BrowserRouter, Route, Navigate, useNavigate } from "react-router-dom";
import Login from './pages/login';
import { CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import Home from './pages/home';
import Register from './pages/register';
import { selectCurrentToken, selectCurrentUser } from './store/slices/auth/auth';
import { useSelector } from 'react-redux';
function App() {
  const Token = useSelector(selectCurrentToken);
  // const navigate = useNavigate();
  useEffect(() => {
    console.log(Token);
  }, [Token]);
  const theme = useTheme();
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={2}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={Token ? <Navigate to="/" /> : <Login />} />
              <Route path="/" element={Token ? <Home /> : <Navigate to="/login" />} />
              <Route path="/register" element={Token ? <Navigate to="/" /> : <Register />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
  )
}

export default App
