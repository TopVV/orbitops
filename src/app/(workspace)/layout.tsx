import type { ReactNode } from "react";

import { AppShell } from "@/shared/components/app-shell/AppShell";

interface WorkspaceLayoutProps {
  children: ReactNode;
}

export default function WorkspaceLayout({
  children,
}: Readonly<WorkspaceLayoutProps>) {
  return <AppShell>{children}</AppShell>;
}
