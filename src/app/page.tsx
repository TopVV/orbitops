import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h1">OrbitOps</Typography>

          <Typography color="text.secondary">
            B2B SaaS customer operations dashboard.
          </Typography>

          <Button variant="contained">Material UI is working</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
