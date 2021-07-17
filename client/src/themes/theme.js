import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { 
      main: "#3A8DFF",
      dark: '#1970E6',
      light: '#86B9FF',
      contrastText: '#FFFFFF'
    },
    secondary: { main: "#B0B0B0" }
  }
});
