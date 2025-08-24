import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { RegisterDeliveryAddress } from "./RegisterDeliveryAddress";

const meta = {
  component: RegisterDeliveryAddress,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof RegisterDeliveryAddress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("ラジオボタンをクリックすると、コールバックハンドラが呼ばれる", async () => {
      await userEvent.click(canvas.getByLabelText("いいえ"));
      expect(args.onChange).toHaveBeenCalledWith(false);
      await userEvent.click(canvas.getByLabelText("はい"));
      expect(args.onChange).toHaveBeenCalledWith(true);
    });
  },
};