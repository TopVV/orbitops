import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import Box from "@mui/material/Box";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KpiCard } from "../KpiCard";

const meta = {
  title: "Dashboard/KpiCard",
  component: KpiCard,
  tags: ["autodocs"],

  decorators: [
    (Story) => (
      <Box sx={{ width: 340 }}>
        <Story />
      </Box>
    ),
  ],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    icon: {
      control: false,
    },
  },

  args: {
    label: "Active customers",
    value: "128",
    change: "8.2%",
    changeLabel: "vs previous month",
    trendDirection: "up",
    trendTone: "positive",
    icon: <GroupsRoundedIcon />,
    iconTone: "primary",
  },
} satisfies Meta<typeof KpiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ActiveCustomers: Story = {};

export const AtRiskImproving: Story = {
  args: {
    label: "Customers at risk",
    value: "12",
    change: "18.0%",
    trendDirection: "down",
    trendTone: "positive",
    icon: <WarningAmberRoundedIcon />,
    iconTone: "warning",
  },
};

export const NegativeTrend: Story = {
  args: {
    label: "Average health score",
    value: "68 / 100",
    change: "7.4%",
    trendDirection: "down",
    trendTone: "negative",
    icon: <WarningAmberRoundedIcon />,
    iconTone: "error",
  },
};
