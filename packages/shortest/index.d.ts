import type { Expect } from "expect";
import type { Page, Browser, APIRequest, APIRequestContext } from "playwright";
import type * as playwright from "playwright";
import type { ShortestConfig } from "./dist/types/config";
import type { TestAPI, TestContext } from "./dist/types/test";

declare global {
  const expect: Expect;
}

declare module "@antiwork/shortest" {
  export type TestContextProps = {
    page: Page;
    browser: Browser;
    playwright: typeof playwright & {
      request: APIRequest & {
        newContext: (options?: {
          extraHTTPHeaders?: Record<string, string>;
        }) => Promise<APIRequestContext>;
      };
    };
  };

  export type TestChain = {
    expect(fn: (context: TestContextProps) => Promise<void>): TestChain;
    expect(description: string): TestChain;
    expect(
      description: string,
      fn?: (context: TestContextProps) => Promise<void>,
    ): TestChain;
    expect(
      description: string,
      payload?: any,
      fn?: (context: TestContextProps) => Promise<void>,
    ): TestChain;
    after(fn: (context: TestContextProps) => void | Promise<void>): TestChain;
  };

  export type TestAPI = {
    (fn: (context: TestContextProps) => Promise<void>): void;
    (name: string): TestChain;
    (
      name: string,
      fn?: (context: TestContextProps) => Promise<void>,
    ): TestChain;
    (
      name: string,
      payload?: any,
      fn?: (context: TestContextProps) => Promise<void>,
    ): TestChain;

    beforeAll(fn: (context: TestContextProps) => Promise<void>): void;
    beforeAll(
      name: string,
      fn: (context: TestContextProps) => Promise<void>,
    ): void;

    afterAll(fn: (context: TestContextProps) => Promise<void>): void;
    afterAll(
      name: string,
      fn: (context: TestContextProps) => Promise<void>,
    ): void;

    beforeEach(fn: (context: TestContextProps) => Promise<void>): void;
    beforeEach(
      name: string,
      fn: (context: TestContextProps) => Promise<void>,
    ): void;

    afterEach(fn: (context: TestContextProps) => Promise<void>): void;
    afterEach(
      name: string,
      fn: (context: TestContextProps) => Promise<void>,
    ): void;
  };

  export const shortest: TestAPI;
  export type { TestContext, ShortestConfig };
}
