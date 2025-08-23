import type { Meta, StoryObj } from "@storybook/react-vite";

import { Form } from "./Form";

const meta = {
  component: Form,
  args: { name: "John Doe" },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
