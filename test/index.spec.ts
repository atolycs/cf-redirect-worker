import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
  SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { default as worker } from "../src/index";

describe("fetch function", () => {
  it("should return error response for invalid request", async () => {
    const invalidRequest = new Request("https://invalid.url");
    const response = await worker.fetch(invalidRequest);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data).toEqual({
      status: false,
      message: "Invalid request",
    });
  });

  it("should return redirect response for success request (dotfiles)", async () => {
    const validRequest = new Request(
      "https://dotfiles.atolycs.workers.dev/linux",
    );
    const response = await worker.fetch(validRequest);

    expect(response.status).toBe(301);
  });

  it("should return redirect response for success request (setup)", async () => {
    const validRequest = new Request("https://setup.atolycs.workers.dev/linux");
    const response = await worker.fetch(validRequest);

    expect(response.status).toBe(301);
  });
});
