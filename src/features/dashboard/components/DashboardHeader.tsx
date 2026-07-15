"use client";

import Link from "next/link";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function DashboardHeader() {
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      sx={{
        alignItems: {
          xs: "stretch",
          sm: "center",
        },
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h1">Operations Overview</Typography>

        <Typography color="text.secondary">
          Monitor customer health, revenue, and accounts requiring attention.
        </Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          Last 30 days
        </Typography>

        <Button
          component={Link}
          href="/customers/new"
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          Add customer
        </Button>
      </Stack>
    </Stack>
  );
}
