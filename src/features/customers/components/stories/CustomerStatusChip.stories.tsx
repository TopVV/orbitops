import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CustomerStatusChip } from "../CustomerChips";

const meta = {
  title: "Customers/CustomerStatusChip",
  component: CustomerStatusChip,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    status: {
      control: "select",
      options: ["trial", "active", "paused", "churned"],
    },
  },

  args: {
    status: "active",
  },
} satisfies Meta<typeof CustomerStatusChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Trial: Story = {
  args: {
    status: "trial",
  },
};

export const Paused: Story = {
  args: {
    status: "paused",
  },
};

export const Churned: Story = {
  args: {
    status: "churned",
  },
};
