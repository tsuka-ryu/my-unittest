import { describe, expect, test } from "vitest";
import { checkPhoneNumber, ValidationError, ValidationErrorMessage } from "./validations";

describe("validations", () => {
  describe("checkPhoneNumber", () => {
    test("正常な電話番号はエラーをスローしない", () => {
      expect(() => checkPhoneNumber("090-1234-5678")).not.toThrow();
      expect(() => checkPhoneNumber("0312345678")).not.toThrow();
      expect(() => checkPhoneNumber("03-1234-5678")).not.toThrow();
    });

    test("不正な電話番号はValidationErrorをスローする", () => {
      expect(() => checkPhoneNumber("invalid-phone")).toThrow(ValidationError);
      expect(() => checkPhoneNumber("090-1234-abcd")).toThrow(ValidationErrorMessage);
      expect(() => checkPhoneNumber("phone123")).toThrow(ValidationErrorMessage);
      expect(() => checkPhoneNumber("090-1234-567a")).toThrow(ValidationErrorMessage);
    });

    test("空文字や特殊文字を含む場合はエラーをスローする", () => {
      expect(() => checkPhoneNumber("")).toThrow(ValidationError);
      expect(() => checkPhoneNumber("090@1234@5678")).toThrow(ValidationError);
      expect(() => checkPhoneNumber("090.1234.5678")).toThrow(ValidationError);
    });
  });
});