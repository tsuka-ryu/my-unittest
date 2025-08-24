import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { ArticleList } from "./ArticleList";
import { items } from "./fixture";

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "記事一覧" })
    ).toBeInTheDocument();
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);

    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();
    await expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  },
};

export const NoItem: Story = {
  args: { items: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const list = canvas.queryByRole("list");
    await expect(list).not.toBeInTheDocument();
    await expect(list).toBeNull();
    await expect(canvas.getByText("投稿記事がありません")).toBeInTheDocument();
  },
};
