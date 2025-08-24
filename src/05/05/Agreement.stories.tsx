import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Agreement } from "./Agreement";

const meta = {
  component: Agreement,
} satisfies Meta<typeof Agreement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "fieldset のアクセシブルネームは、legend を引用している",
      async () => {
        await expect(
          canvas.getByRole("group", { name: "利用規約の同意" })
        ).toBeInTheDocument();
      }
    );

    await step("チェックボックスはチェックが入っていない", async () => {
      await expect(canvas.getByRole("checkbox")).not.toBeChecked();
    });

    await step("利用規約へのリンクがある", async () => {
      await expect(canvas.getByRole("link")).toBeInTheDocument();
      await expect(canvas.getByRole("link")).toHaveTextContent("利用規約");
      await expect(canvas.getByRole("link")).toHaveAttribute("href", "/terms");
      await expect(
        canvas.getByRole("link", { name: "利用規約" })
      ).toHaveAttribute("href", "/terms");
    });
  },
};
