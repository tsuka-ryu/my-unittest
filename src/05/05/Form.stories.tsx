import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Form } from "./Form";

const meta = {
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("form のアクセシブルネームは、見出しを引用している", async () => {
      await expect(
        canvas.getByRole("form", { name: "新規アカウント登録" })
      ).toBeInTheDocument();
    });

    await step("主要エリアが表示されている", async () => {
      await expect(
        canvas.getByRole("heading", { name: "新規アカウント登録" })
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole("group", { name: "アカウント情報の入力" })
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole("group", { name: "利用規約の同意" })
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole("button", { name: "サインアップ" })
      ).toBeInTheDocument();
    });

    await step("「サインアップ」ボタンは非活性", async () => {
      await expect(
        canvas.getByRole("button", { name: "サインアップ" })
      ).toBeDisabled();
    });

    await step(
      "「利用規約の同意」チェックボックスを押下すると「サインアップ」ボタンは活性化",
      async () => {
        await userEvent.click(canvas.getByRole("checkbox"));
        await expect(
          canvas.getByRole("button", { name: "サインアップ" })
        ).toBeEnabled();
      }
    );
  },
};