import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function CustomersPage() {
  return (
    <Stack spacing={0.5}>
      <Typography variant="h1">Customers</Typography>

      <Typography color="text.secondary">
        Search, filter, and manage your customer accounts.
      </Typography>
    </Stack>
  );
}
