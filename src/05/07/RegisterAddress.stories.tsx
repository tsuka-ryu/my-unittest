import type { Meta, StoryObj } from "@storybook/react-vite";
import { HttpResponse, http } from "msw";
import { expect, within } from "storybook/test";
import { host } from "./fetchers";
import { httpError, postMyAddressMock } from "./fetchers/fixtures";
import { RegisterAddress } from "./RegisterAddress";
import {
  clickSubmit,
  inputContactNumber,
  inputDeliveryAddress,
} from "./testingUtils";

const meta = {
  component: RegisterAddress,
} satisfies Meta<typeof RegisterAddress>;

export default meta;
type Story = StoryObj<typeof meta>;

async function fillValuesAndSubmit(canvas: ReturnType<typeof within>) {
  const contactNumber = await inputContactNumber(canvas);
  const deliveryAddress = await inputDeliveryAddress(canvas);
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit(canvas);
  return submitValues;
}

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(host("/my/address"), () => {
          return HttpResponse.json(postMyAddressMock);
        }),
      ],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("成功時「登録しました」が表示される", async () => {
      await fillValuesAndSubmit(canvas);
      expect(canvas.getByText("登録しました")).toBeInTheDocument();
    });
  },
};

export const ServerError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(host("/my/address"), () => {
          return HttpResponse.json(httpError, { status: 500 }); // TODO: エラーの返し方これであってるのかしら
        }),
      ],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("失敗時「登録に失敗しました」が表示される", async () => {
      await fillValuesAndSubmit(canvas);
      expect(canvas.getByText("登録に失敗しました")).toBeInTheDocument();
    });
  },
};

// TODO: テストの実装
// export const ValidationError: Story = {
//   play: async ({ canvasElement, step }) => {
//     const canvas = within(canvasElement);

//     await step(
//       "不正な電話番号を入力するとバリデーションエラーが表示される",
//       async () => {
//         const nameInput = canvas.getByLabelText("氏名");
//         const phoneInput = canvas.getByLabelText("電話番号");
//         const postalCodeInput = canvas.getByLabelText("郵便番号");
//         const prefecturesInput = canvas.getByLabelText("都道府県");
//         const municipalitiesInput = canvas.getByLabelText("市区町村");
//         const streetNumberInput = canvas.getByLabelText("番地番号");
//         const submitButton = canvas.getByRole("button", { name: "送信" });

//         await userEvent.type(nameInput, "田中太郎");
//         await userEvent.type(phoneInput, "invalid-phone");
//         await userEvent.type(postalCodeInput, "167-0051");
//         await userEvent.type(prefecturesInput, "東京都");
//         await userEvent.type(municipalitiesInput, "杉並区荻窪1");
//         await userEvent.type(streetNumberInput, "00-00");
//         await userEvent.click(submitButton);

//         expect(
//           canvas.getByText("不正な入力値が含まれています")
//         ).toBeInTheDocument();
//       }
//     );
//   },
// };

// export const FormSnapshot: Story = {
//   play: async ({ canvasElement, step }) => {
//     await step("フォームが正しく表示されることを確認", async () => {
//       const canvas = within(canvasElement);

//       expect(canvas.getByLabelText("氏名")).toBeInTheDocument();
//       expect(canvas.getByLabelText("電話番号")).toBeInTheDocument();
//       expect(canvas.getByLabelText("郵便番号")).toBeInTheDocument();
//       expect(canvas.getByLabelText("都道府県")).toBeInTheDocument();
//       expect(canvas.getByLabelText("市区町村")).toBeInTheDocument();
//       expect(canvas.getByLabelText("番地番号")).toBeInTheDocument();
//       expect(canvas.getByRole("button", { name: "送信" })).toBeInTheDocument();
//     });
//   },
// };
