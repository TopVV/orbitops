import { CustomerFormPageContent } from "@/features/customers/components/CustomerFormPageContent";

interface EditCustomerPageProps {
  params: Promise<{
    customerId: string;
  }>;
}

export default async function EditCustomerPage({
  params,
}: EditCustomerPageProps) {
  const { customerId } = await params;

  return <CustomerFormPageContent mode="edit" customerId={customerId} />;
}
