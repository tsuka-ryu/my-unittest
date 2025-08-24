import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { deliveryAddresses } from "./fixtures";
import { PastDeliveryAddress } from "./PastDeliveryAddress";

const meta = {
  component: PastDeliveryAddress,
  args: {
    options: deliveryAddresses,
  },
} satisfies Meta<typeof PastDeliveryAddress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("見出しの表示", async () => {
      expect(canvas.getByText("過去のお届け先")).toBeInTheDocument();
    });

    await step("選択リストの表示", async () => {
      expect(canvas.getByRole("combobox")).toBeInTheDocument();
    });

    await step("オプションの表示", async () => {
      const select = canvas.getByRole("combobox");
      expect(select).toContainHTML("〒167-0051 東京都杉並区荻窪1-00-00");
    });
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("disabled={true} の場合、combobox も非活性", async () => {
      expect(canvas.getByRole("combobox")).toBeDisabled();
    });
  },
};
