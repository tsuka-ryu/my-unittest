import { vi } from "vitest";
import * as Fetchers from ".";
import { httpError, postMyAddressMock } from "./fixtures";

export function mockPostMyAddress(status = 201) {
  if (status > 299) {
    return vi.spyOn(Fetchers, "postMyAddress").mockRejectedValueOnce(httpError);
  }
  return vi
    .spyOn(Fetchers, "postMyAddress")
    .mockResolvedValueOnce(postMyAddressMock);
}
