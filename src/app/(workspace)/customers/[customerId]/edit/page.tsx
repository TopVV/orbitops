import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface EditCustomerPageProps {
  params: Promise<{
    customerId: string;
  }>;
}

export default async function EditCustomerPage({
  params,
}: EditCustomerPageProps) {
  const { customerId } = await params;

  return (
    <Stack spacing={0.5}>
      <Typography variant="h1">Edit customer</Typography>

      <Typography color="text.secondary">Customer ID: {customerId}</Typography>
    </Stack>
  );
}
