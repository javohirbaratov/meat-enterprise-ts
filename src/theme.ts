import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontFamily: "OpenSans, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: "140%",
          padding: "0px 4px",
          height: "auto",
        },
      },
      variants: [
        {
          props: { color: "success" },
          style: {
            backgroundColor: "rgba(59, 191, 147, 0.149)", // or any other color you want
            color: "#3BBE92",
            "&:hover": {
              backgroundColor: "rgba(59, 191, 147, 0.4)", // hover color
            },
          },
        },
        {
          props: { color: "warning" },
          style: {
            backgroundColor: "rgba(255, 201, 12, 0.149)", // or any other color you want
            color: "#FFC90C",
            "&:hover": {
              backgroundColor: "rgba(255, 201, 12, 0.4)", // hover color
            },
          },
        },
        {
          props: { color: "error" },
          style: {
            backgroundColor: "rgba(249, 97, 89, 0.15)", // or any other color you want
            color: "#F96159",
            "&:hover": {
              backgroundColor: "rgba(249, 97, 89, 0.4)", // hover color
            },
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "initial",
          lineHeight: "160%",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "none",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
        list: {
          padding: 4,
          borderRadius: 12,
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
