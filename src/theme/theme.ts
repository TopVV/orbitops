'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: true,

  palette: {
    mode: "light",

    primary: {
      main: "#C64B12",
      dark: "#9A3412",
      light: "#EA7A3B",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#FBF6EC",
      paper: "#FFFBF3",
    },

    text: {
      primary: "#29261F",
      secondary: "#756F61",
    },

    divider: "#E4D6BD",

    success: {
      main: "#4D7C2F",
    },

    warning: {
      main: "#D97706",
    },

    error: {
      main: "#B33A2B",
    },
  },

  typography: {
    fontFamily: "var(--font-inter, Arial), sans-serif",

    h1: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: "-0.025em",
    },

    h2: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.02em",
    },

    h3: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },

    body1: {
      fontSize: "0.9375rem",
      lineHeight: 1.6,
    },

    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },

    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          minHeight: 40,
          borderRadius: 6,
          paddingInline: 16,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid",
          borderColor: "#E4D6BD",
          boxShadow: "0 1px 2px rgba(74, 55, 31, 0.035)",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#756F61",
          backgroundColor: "#FBF4E8",
          fontWeight: 650,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
