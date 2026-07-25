import Box from "@mui/material/Box";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CustomerForm } from "../CustomerForm";
import { CUSTOMER_FIXTURES } from "../../data/customer-fixtures";
import { getCustomerFormDefaultValues } from "../../utils/customer-form-mappers";

const meta = {
  title: "Customers/CustomerForm",
  component: CustomerForm,
  tags: ["autodocs"],

  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Story />
      </Box>
    ),
  ],

  parameters: {
    layout: "fullscreen",
  },

  argTypes: {
    defaultValues: {
      control: false,
    },

    onSubmit: {
      control: false,
    },
  },

  args: {
    mode: "create",
    defaultValues: getCustomerFormDefaultValues(),
    cancelHref: "/customers",
    isSaving: false,
    onSubmit: () => Promise.resolve(),
  },
} satisfies Meta<typeof CustomerForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CreateEmpty: Story = {};

export const EditPrefilled: Story = {
  args: {
    mode: "edit",
    defaultValues: getCustomerFormDefaultValues(CUSTOMER_FIXTURES[0]),
    cancelHref: `/customers/${CUSTOMER_FIXTURES[0].id}`,
  },
};

export const Saving: Story = {
  args: {
    mode: "edit",
    defaultValues: getCustomerFormDefaultValues(CUSTOMER_FIXTURES[0]),
    isSaving: true,
  },
};

export const ServerError: Story = {
  args: {
    serverError: "Unable to save customer. Please try again.",
  },
};
