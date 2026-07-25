'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: true,

  palette: {
    mode: "light",

    primary: {
      main: "#635BFF",
      dark: "#4F46E5",
      light: "#818CF8",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F7F8FA",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111827",
      secondary: "#667085",
    },

    divider: "#E5E7EB",

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#D97706",
    },

    error: {
      main: "#DC2626",
    },
  },

  typography: {
    fontFamily: "var(--font-inter, Arial), sans-serif",

    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.025em",
    },

    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
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
          borderRadius: 8,
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
          borderColor: "#E5E7EB",
          boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
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