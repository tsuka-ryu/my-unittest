import type { Meta, StoryObj } from "@storybook/react-vite";
import { HttpResponse, http } from "msw";
import { expect, mocked, waitFor, within } from "storybook/test";
import { host } from "./fetchers";
import { httpError, postMyAddressMock } from "./fetchers/fixtures";
import { RegisterAddress } from "./RegisterAddress";
import {
  clickSubmit,
  inputContactNumber,
  inputDeliveryAddress,
} from "./testingUtils";
import { checkPhoneNumber } from "./validations";

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

async function fillInvalidValuesAndSubmit(canvas: ReturnType<typeof within>) {
  const contactNumber = await inputContactNumber(canvas, {
    name: "田中 太郎",
    phoneNumber: "invalid-phone",
  });
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
      await waitFor(() => {
        expect(canvas.getByText("登録しました")).toBeInTheDocument();
      });
    });
  },
};

export const ServerError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(host("/my/address"), () => {
          return HttpResponse.json(httpError, { status: 500 });
        }),
      ],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("失敗時「登録に失敗しました」が表示される", async () => {
      await fillValuesAndSubmit(canvas);
      await waitFor(() => {
        expect(canvas.getByText("登録に失敗しました")).toBeInTheDocument();
      });
    });
  },
};

export const ValidationError: Story = {
  beforeEach: () => {
    mocked(checkPhoneNumber).mockImplementation(() => {
      throw new Error("電話番号が不正です");
    });
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "バリデーションエラー時「不正な入力値が含まれています」が表示される",
      async () => {
        await fillInvalidValuesAndSubmit(canvas);
        await waitFor(() => {
          expect(
            canvas.getByText("不正な入力値が含まれています")
          ).toBeInTheDocument();
        });
      }
    );
  },
};

export const UnknownError: Story = {
  beforeEach: () => {
    mocked(checkPhoneNumber).mockImplementation(() => {
      throw new Error("Unknown Error");
    });
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "不明なエラー時「不明なエラーが発生しました」が表示される",
      async () => {
        await fillValuesAndSubmit(canvas);
        await waitFor(() => {
          expect(
            canvas.getByText("不明なエラーが発生しました")
          ).toBeInTheDocument();
        });
      }
    );
  },
};
