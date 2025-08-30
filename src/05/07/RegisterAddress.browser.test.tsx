import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { postMyAddress } from "./fetchers";
import { postMyAddressMock } from "./fetchers/fixtures";
import { RegisterAddress } from "./RegisterAddress";
import { checkPhoneNumber, ValidationError } from "./validations";

vi.mock("./fetchers");
vi.mock("./validations", async () => {
  const actual = await vi.importActual<typeof import("./validations")>(
    "./validations"
  );
  return {
    ...actual,
    checkPhoneNumber: vi.fn(),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

async function fillValuesAndSubmit(screen: ReturnType<typeof render>) {
  await screen.getByRole("textbox", { name: "電話番号" }).fill("000-0000-0000");
  await screen.getByRole("textbox", { name: "お名前" }).fill("田中 太郎");
  await screen.getByRole("textbox", { name: "郵便番号" }).fill("167-0051");
  await screen.getByRole("textbox", { name: "都道府県" }).fill("東京都");
  await screen.getByRole("textbox", { name: "市区町村" }).fill("杉並区荻窪1");
  await screen.getByRole("textbox", { name: "番地番号" }).fill("00-00");
  await screen.getByRole("button", { name: "注文内容の確認へ進む" }).click();
}

async function fillInvalidValuesAndSubmit(screen: ReturnType<typeof render>) {
  await screen.getByRole("textbox", { name: "電話番号" }).fill("invalid-phone");
  await screen.getByRole("textbox", { name: "お名前" }).fill("田中 太郎");
  await screen.getByRole("textbox", { name: "郵便番号" }).fill("167-0051");
  await screen.getByRole("textbox", { name: "都道府県" }).fill("東京都");
  await screen.getByRole("textbox", { name: "市区町村" }).fill("杉並区荻窪1");
  await screen.getByRole("textbox", { name: "番地番号" }).fill("00-00");
  await screen.getByRole("button", { name: "注文内容の確認へ進む" }).click();
}

test("成功時「登録しました」が表示される", async () => {
  vi.mocked(postMyAddress).mockResolvedValue(postMyAddressMock);
  vi.mocked(checkPhoneNumber).mockImplementation(() => {});

  const screen = render(<RegisterAddress />);
  await fillValuesAndSubmit(screen);
  await expect.element(screen.getByText("登録しました")).toBeInTheDocument();
});

test("失敗時「登録に失敗しました」が表示される", async () => {
  vi.mocked(postMyAddress).mockRejectedValue(new Error("Server Error"));
  vi.mocked(checkPhoneNumber).mockImplementation(() => {});

  const screen = render(<RegisterAddress />);
  await fillValuesAndSubmit(screen);
  await expect
    .element(screen.getByText("登録に失敗しました"))
    .toBeInTheDocument();
});

test("バリデーションエラー時「不正な入力値が含まれています」が表示される", async () => {
  vi.mocked(checkPhoneNumber).mockImplementation(() => {
    throw new ValidationError("Invalid phone number");
  });

  const screen = render(<RegisterAddress />);
  await fillInvalidValuesAndSubmit(screen);
  await expect
    .element(screen.getByText("不正な入力値が含まれています"))
    .toBeInTheDocument();
});

test("不明なエラー時「不明なエラーが発生しました」が表示される", async () => {
  vi.mocked(checkPhoneNumber).mockImplementation(() => {
    throw new Error("Unknown Error");
  });

  const screen = render(<RegisterAddress />);
  await fillValuesAndSubmit(screen);
  await expect
    .element(screen.getByText("不明なエラーが発生しました"))
    .toBeInTheDocument();
});
