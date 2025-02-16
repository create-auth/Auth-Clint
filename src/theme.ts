// theme.js
import { colors } from '@mui/material';
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
        dark1: '#393737',
        dark2: '#545353',
      },
      divider: "#bdbdbd",
    },
    typography: {
      fontFamily: 'Rubik',
    },
  });
};