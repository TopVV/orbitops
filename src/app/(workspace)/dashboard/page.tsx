import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function DashboardPage() {
  return (
    <Stack spacing={0.5}>
      <Typography variant="h1">Operations Overview</Typography>

      <Typography color="text.secondary">
        Monitor customer health, revenue, and accounts requiring attention.
      </Typography>
    </Stack>
  );
}
