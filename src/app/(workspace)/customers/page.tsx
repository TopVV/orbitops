import { Suspense } from "react";

import { CustomersPageContent } from "@/features/customers/components/CustomersPageContent";
import { CustomersTableSkeleton } from "@/features/customers/components/CustomersTable";

export default function CustomersPage() {
  return (
    <Suspense fallback={<CustomersTableSkeleton />}>
      <CustomersPageContent />
    </Suspense>
  );
}
