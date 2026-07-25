import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CustomerHealthChip } from "../CustomerChips";

const meta = {
  title: "Customers/CustomerHealthChip",
  component: CustomerHealthChip,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    status: {
      control: "select",
      options: ["healthy", "needs-attention", "at-risk"],
    },

    score: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },

  args: {
    status: "healthy",
    score: 88,
  },
} satisfies Meta<typeof CustomerHealthChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Healthy: Story = {};

export const NeedsAttention: Story = {
  args: {
    status: "needs-attention",
    score: 67,
  },
};

export const AtRisk: Story = {
  args: {
    status: "at-risk",
    score: 42,
  },
};
