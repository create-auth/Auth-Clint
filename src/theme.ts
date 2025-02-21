// theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: "#0d47a1",
      },
      secondary: {
        main: '#ffebcd',
        dark: '#1c1c1c',
      },
      divider: "#bdbdbd",
    },
    typography: {
      fontFamily: 'Rubik',
    },
  });
};