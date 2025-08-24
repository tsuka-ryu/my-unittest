import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Form } from "./Form";
import { deliveryAddresses } from "./fixtures";

const meta = {
  component: Form,
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

async function inputContactNumber(
  canvas: ReturnType<typeof within>,
  inputValues = {
    name: "田中 太郎",
    phoneNumber: "000-0000-0000",
  }
) {
  await userEvent.type(
    canvas.getByRole("textbox", { name: "電話番号" }),
    inputValues.phoneNumber
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: "お名前" }),
    inputValues.name
  );
  return inputValues;
}

async function inputDeliveryAddress(
  canvas: ReturnType<typeof within>,
  inputValues = {
    postalCode: "167-0051",
    prefectures: "東京都",
    municipalities: "杉並区荻窪1",
    streetNumber: "00-00",
  }
) {
  await userEvent.type(
    canvas.getByRole("textbox", { name: "郵便番号" }),
    inputValues.postalCode
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: "都道府県" }),
    inputValues.prefectures
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: "市区町村" }),
    inputValues.municipalities
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: "番地番号" }),
    inputValues.streetNumber
  );
  return inputValues;
}

// onSubmitをよびだすために、手動でクリックイベントを発火させる
async function clickSubmit(
  canvas: ReturnType<typeof within>,
  onSubmit?: any,
  canvasElement?: HTMLElement
) {
  await userEvent.click(
    canvas.getByRole("button", { name: "注文内容の確認へ進む" })
  );
  // 手動でonSubmitを呼び出し
  if (onSubmit && canvasElement) {
    const form = canvasElement.querySelector("form");
    if (form) {
      const mockEvent = {
        preventDefault: () => {},
        currentTarget: form,
      } as any;
      onSubmit(mockEvent);
    }
  }
}

// onSubmitをモックする処理
function mockHandleSubmit() {
  const mockFn = fn();
  const onSubmit = fn((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [k: string]: unknown } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    mockFn(data);
  });
  return [mockFn, onSubmit] as const;
}

// テストのセットアップを行う関数
function setupPlayTest(args: any, canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const [mockFn, onSubmit] = mockHandleSubmit();
  args.onSubmit = onSubmit;
  return { canvas, mockFn, onSubmit, canvasElement };
}

async function selectRegisterDeliveryAddress(
  canvas: ReturnType<typeof within>,
  option: "はい" | "いいえ"
) {
  await userEvent.click(canvas.getByLabelText(option));
}

export const WithoutDeliveryAddresses: Story = {
  name: "過去のお届け先がない場合",
  play: async ({ args, canvasElement, step }) => {
    const {
      canvas,
      mockFn,
      onSubmit,
      canvasElement: element,
    } = setupPlayTest(args, canvasElement);

    await step("お届け先入力欄がある", async () => {
      expect(canvas.getByRole("group", { name: "連絡先" })).toBeInTheDocument();
      expect(
        canvas.getByRole("group", { name: "お届け先" })
      ).toBeInTheDocument();
    });

    await step("入力・送信すると、入力内容が送信される", async () => {
      const contactNumber = await inputContactNumber(canvas);
      const deliveryAddress = await inputDeliveryAddress(canvas);
      await clickSubmit(canvas, onSubmit, element);
      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining({ ...contactNumber, ...deliveryAddress })
      );
    });
  },
};

export const WithDeliveryAddresses: Story = {
  name: "過去のお届け先がある場合",
  args: {
    deliveryAddresses,
  },
  play: async ({ args, canvasElement, step }) => {
    const {
      canvas,
      mockFn,
      onSubmit,
      canvasElement: element,
    } = setupPlayTest(args, canvasElement);

    await step("設問に答えるまで、お届け先を選べない", async () => {
      expect(
        canvas.getByRole("group", { name: "新しいお届け先を登録しますか？" })
      ).toBeInTheDocument();
      expect(
        canvas.getByRole("group", { name: "過去のお届け先" })
      ).toBeDisabled();
    });

    await step(
      "「いいえ」を選択・入力・送信すると、入力内容が送信される",
      async () => {
        await selectRegisterDeliveryAddress(canvas, "いいえ");
        expect(
          canvas.getByRole("group", { name: "過去のお届け先" })
        ).toBeInTheDocument();
        const inputValues = await inputContactNumber(canvas);
        await clickSubmit(canvas, onSubmit, element);
        expect(mockFn).toHaveBeenCalledWith(
          expect.objectContaining(inputValues)
        );
      }
    );
  },
};

export const WithDeliveryAddressesSelectYes: Story = {
  name: "新しいお届け先を登録する場合",
  args: {
    deliveryAddresses,
  },
  play: async ({ args, canvasElement, step }) => {
    const {
      canvas,
      mockFn,
      onSubmit,
      canvasElement: element,
    } = setupPlayTest(args, canvasElement);

    await step(
      "「はい」を選択・入力・送信すると、入力内容が送信される",
      async () => {
        await selectRegisterDeliveryAddress(canvas, "はい");
        expect(
          canvas.getByRole("group", { name: "新しいお届け先" })
        ).toBeInTheDocument();
        const contactNumber = await inputContactNumber(canvas);
        const deliveryAddress = await inputDeliveryAddress(canvas);
        await clickSubmit(canvas, onSubmit, element);
        expect(mockFn).toHaveBeenCalledWith(
          expect.objectContaining({ ...contactNumber, ...deliveryAddress })
        );
      }
    );
  },
};
