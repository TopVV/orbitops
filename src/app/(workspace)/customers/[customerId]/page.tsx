import { notFound } from "next/navigation";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AT_RISK_CUSTOMERS } from "@/features/dashboard/data/dashboard-data";

export function generateStaticParams() {
  return AT_RISK_CUSTOMERS.map((customer) => ({
    customerId: customer.id,
  }));
}

interface CustomerDetailsPageProps {
  params: Promise<{
    customerId: string;
  }>;
}

export default async function CustomerDetailsPage({
  params,
}: CustomerDetailsPageProps) {
  const { customerId } = await params;

  const customer = AT_RISK_CUSTOMERS.find((item) => item.id === customerId);

  if (!customer) {
    notFound();
  }

  return (
    <Stack spacing={0.5}>
      <Typography variant="h1">{customer.companyName}</Typography>

      <Typography color="text.secondary">
        Full customer details will be implemented later.
      </Typography>
    </Stack>
  );
}
