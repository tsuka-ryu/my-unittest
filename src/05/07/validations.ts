export class ValidationError extends Error {}

export const ValidationErrorMessage = "電話番号が不正です";

export function checkPhoneNumber(value: any) {
  if (!value.match(/^[0-9\-]+$/)) {
    throw new ValidationError(ValidationErrorMessage);
  }
}
