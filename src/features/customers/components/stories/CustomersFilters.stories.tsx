import Card from "@mui/material/Card";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CustomersFilters } from "../CustomersFilters";

const meta = {
  title: "Customers/CustomersFilters",
  component: CustomersFilters,
  tags: ["autodocs"],

  decorators: [
    (Story) => (
      <Card
        sx={{
          width: "min(1400px, calc(100vw - 32px))",
          overflow: "hidden",
        }}
      >
        <Story />
      </Card>
    ),
  ],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    onSearchChange: {
      control: false,
    },
    onStatusChange: {
      control: false,
    },
    onHealthStatusChange: {
      control: false,
    },
    onSegmentChange: {
      control: false,
    },
    onClear: {
      control: false,
    },
  },

  args: {
    searchValue: "",
    status: null,
    healthStatus: null,
    segment: null,
    hasActiveFilters: false,

    onSearchChange: () => undefined,
    onStatusChange: () => undefined,
    onHealthStatusChange: () => undefined,
    onSegmentChange: () => undefined,
    onClear: () => undefined,
  },
} satisfies Meta<typeof CustomersFilters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ActiveFilters: Story = {
  args: {
    searchValue: "nova",
    status: "active",
    healthStatus: "at-risk",
    segment: "enterprise",
    hasActiveFilters: true,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
