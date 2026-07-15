import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import {
  KpiCard,
  type KpiCardProps,
} from "@/features/dashboard/components/KpiCard";

const KPI_ITEMS = [
  {
    label: "Active customers",
    value: "128",
    change: "8.2%",
    changeLabel: "vs previous month",
    trendDirection: "up",
    trendTone: "positive",
    icon: <GroupsRoundedIcon />,
    iconTone: "primary",
  },
  {
    label: "Monthly recurring revenue",
    value: "$184.6K",
    change: "12.4%",
    changeLabel: "vs previous month",
    trendDirection: "up",
    trendTone: "positive",
    icon: <PaymentsRoundedIcon />,
    iconTone: "success",
  },
  {
    label: "Customers at risk",
    value: "12",
    change: "18.0%",
    changeLabel: "vs previous month",
    trendDirection: "down",
    trendTone: "positive",
    icon: <WarningAmberRoundedIcon />,
    iconTone: "warning",
  },
  {
    label: "Average health score",
    value: "82 / 100",
    change: "4.1%",
    changeLabel: "vs previous month",
    trendDirection: "up",
    trendTone: "positive",
    icon: <HealthAndSafetyRoundedIcon />,
    iconTone: "success",
  },
] satisfies ReadonlyArray<KpiCardProps>;

export default function DashboardPage() {
  return (
    <Stack spacing={4} component="div">
      <DashboardHeader />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {KPI_ITEMS.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </Box>
    </Stack>
  );
}
