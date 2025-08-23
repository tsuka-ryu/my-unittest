import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Form } from "./Form";

const meta = {
  component: Form,
  args: {
    name: "John Doe",
    onSubmit: fn(),
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("名前の表示", async () => {
      expect(canvas.getByText("John Doe")).toBeInTheDocument();
    });

    await step("ボタンの表示", async () => {
      expect(canvas.getByRole("button")).toBeInTheDocument();
    });

    await step("見出しの表示", async () => {
      expect(canvas.getByRole("heading")).toHaveTextContent("アカウント情報");
    });

    await step("ボタンを押下すると、イベントハンドラーが呼ばれる", async () => {
      const submitButton = canvas.getByRole("button", {
        name: /編集する/i,
      });
      await userEvent.click(submitButton);
      expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};
