import { CustomerDetailsPageContent } from "@/features/customers/components/CustomerDetailsPageContent";

interface CustomerDetailsPageProps {
  params: Promise<{
    customerId: string;
  }>;
}

export default async function CustomerDetailsPage({
  params,
}: CustomerDetailsPageProps) {
  const { customerId } = await params;

  return <CustomerDetailsPageContent customerId={customerId} />;
}
