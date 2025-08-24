import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { InputAccount } from "./InputAccount";

const meta = {
  component: InputAccount,
} satisfies Meta<typeof InputAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    
    await step("fieldset のアクセシブルネームは、legend を引用している", async () => {
      await expect(
        canvas.getByRole("group", { name: "アカウント情報の入力" })
      ).toBeInTheDocument();
    });
    
    await step("メールアドレス入力欄", async () => {
      const textbox = canvas.getByRole("textbox", { name: "メールアドレス" });
      const value = "taro.tanaka@example.com";
      await user.type(textbox, value);
      await expect(canvas.getByDisplayValue(value)).toBeInTheDocument();
    });
    
    await step("パスワード入力欄", async () => {
      await expect(() => canvas.getByPlaceholderText("8文字以上で入力")).not.toThrow();
      await expect(() => canvas.getByRole("textbox", { name: "パスワード" })).toThrow();
      
      const password = canvas.getByPlaceholderText("8文字以上で入力");
      const value = "abcd1234";
      await user.type(password, value);
      await expect(canvas.getByDisplayValue(value)).toBeInTheDocument();
    });
  },
};