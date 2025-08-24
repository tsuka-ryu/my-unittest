import { userEvent, type within } from "storybook/test";

export async function inputContactNumber(
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

export async function inputDeliveryAddress(
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

export async function clickSubmit(canvas: ReturnType<typeof within>) {
  console.log("Submitting form...");
  await userEvent.click(
    canvas.getByRole("button", { name: "注文内容の確認へ進む" })
  );
}
