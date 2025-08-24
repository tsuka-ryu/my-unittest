import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { ContactNumber } from "./ContactNumber";

const meta = {
  component: ContactNumber,
} satisfies Meta<typeof ContactNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("タイトル", async () => {
      expect(canvas.getByText("連絡先")).toBeInTheDocument();
    });

    await step("電話番号", async () => {
      expect(canvas.getByLabelText("電話番号")).toBeInTheDocument();
    });

    await step("お名前", async () => {
      expect(canvas.getByLabelText("お名前")).toBeInTheDocument();
    });
  },
};