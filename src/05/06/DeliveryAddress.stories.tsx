import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { DeliveryAddress } from "./DeliveryAddress";

const meta = {
  component: DeliveryAddress,
  args: {
    title: "お届け先",
  },
} satisfies Meta<typeof DeliveryAddress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("タイトル", async () => {
      expect(canvas.getByText("お届け先")).toBeInTheDocument();
    });

    await step("郵便番号", async () => {
      expect(canvas.getByRole("textbox", { name: "郵便番号" })).toBeInTheDocument();
    });

    await step("都道府県", async () => {
      expect(canvas.getByRole("textbox", { name: "都道府県" })).toBeInTheDocument();
    });

    await step("市区町村", async () => {
      expect(canvas.getByRole("textbox", { name: "市区町村" })).toBeInTheDocument();
    });

    await step("番地番号", async () => {
      expect(canvas.getByRole("textbox", { name: "番地番号" })).toBeInTheDocument();
    });
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: "新しいお届け先",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("タイトルが変更できる", async () => {
      expect(canvas.getByText("新しいお届け先")).toBeInTheDocument();
    });
  },
};