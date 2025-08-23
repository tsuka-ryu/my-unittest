// TODO: browser modeと通常の.tsのテストが混在する場合のvitestの設定を考える必要がある

// import { expect, test, vi } from "vitest";
// import { render } from "vitest-browser-react";
// import { Form } from "./Form";

// test("名前の表示", async () => {
//   const screen = render(<Form name="taro" />);
//   await expect.element(screen.getByText("taro")).toBeInTheDocument();
// });

// test("ボタンの表示", async () => {
//   const screen = render(<Form name="taro" />);
//   await expect.element(screen.getByRole("button")).toBeInTheDocument();
// });

// test("見出しの表示", async () => {
//   const screen = render(<Form name="taro" />);
//   await expect.element(screen.getByRole("heading")).toHaveTextContent("アカウント情報");
// });

// test("ボタンを押下すると、イベントハンドラーが呼ばれる", async () => {
//   const mockFn = vi.fn();
//   const screen = render(<Form name="taro" onSubmit={mockFn} />);
//   await screen.getByRole("button").click();
//   expect(mockFn).toHaveBeenCalled();
// });

// test("Snapshot: アカウント名「taro」が表示される", async () => {
//   const screen = render(<Form name="taro" />);
//   expect(screen.container).toMatchSnapshot();
// });

// test("logRoles: レンダリング結果からロール・アクセシブルネームを確認", async () => {
//   const screen = render(<Form name="taro" />);
//   console.log(screen.container.innerHTML);
// });
